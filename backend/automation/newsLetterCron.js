import cron from "node-cron";
import { Job } from "../models/jobSchema.js";
import { User } from "../models/userSchema.js";
import { sendEmail } from "../utils/sendEmail.js";

export const newsLetterCron = () => {
    cron.schedule("*/1 * * * *", async () => {
        console.log("Running Cron Automation");

        try {
            // Fetch jobs where newsletter is NOT sent
            const jobs = await Job.find({ newsLetterSent: false });

            for (const job of jobs) {
                try {
                    // Find users whose job niche matches this job's niche
                    const matchingUsers = await User.find({
                        $or: [
                            { "niches.firstNiche": job.jobNiche },
                            { "niches.secondNiche": job.jobNiche },
                            { "niches.thirdNiche": job.jobNiche },
                        ],
                    });

                    // If no matching users found, continue to next job
                    if (matchingUsers.length === 0) {
                        console.log(` No matching users for job: ${job.title} (${job.jobNiche})`);
                        continue;
                    }

                    // Send emails to matching users
                    for (const user of matchingUsers) {
                        const subject = `Hot Job Alert: ${job.title} in ${job.jobNiche} Available Now`;
                        const message = `
    <p>Hi ${user.name},</p>

    <p>Great news! A new job that fits your niche has just been posted.<br>
    The position is for a <strong>${job.title}</strong> with <strong>${job.companyName}</strong>, and they are looking to hire immediately.</p>

    <h3>Job Details:</h3>
    <ul>
        <li><strong>Position:</strong> ${job.title}</li>
        <li><strong>Company:</strong> ${job.companyName}</li>
        <li><strong>Location:</strong> ${job.location}</li>
        <li><strong>Salary:</strong> ${job.salary}</li>
    </ul>

    <p>Don't wait too long! Job openings like these are filled quickly.</p>

    <p>We're here to support you in your job search. Best of luck!</p>

    <p><strong>Best Regards,</strong><br>
    NicheNest Team</p>
`;



                        try {
                            await sendEmail({
                                email: user.email,
                                subject,
                                message,
                            });
                            console.log(` Email sent to: ${user.email} for job: ${job.title}`);
                        } catch (emailError) {
                            console.error(` Failed to send email to ${user.email}:`, emailError);
                        }
                    }

                    // Mark job as newsletter sent
                    job.newsLetterSent = true;
                    await job.save();
                    console.log(` Updated job: ${job._id}, newsLetterSent = true`);
                } catch (jobError) {
                    console.error(` Error processing job ${job._id}:`, jobError);
                }
            }
        } catch (cronError) {
            console.error(" ERROR IN NODE CRON CATCH BLOCK:", cronError);
        }
    });
};
