
import {LuUserPlus} from "react-icons/lu"
import {VscTasklist} from "react-icons/vsc"
import {BiSolidLike} from "react-icons/bi"

const HowItWorks = () => {
  return (
    <section className="howItWorks">
      <h3>How does it work ?</h3>
      <div className="container">
        <div className="card">
          <div className="icon">
            <LuUserPlus/>
          </div>
          <h4>Create a account </h4>
          <p>Creating an account gives you access to 
            
            exclusive features and a personalized 
            experience. With your account, you can 
            save preferences, track progress, and 
            seamlessly manage your activities. Sign 
            up today to stay connected, receive updates, 
            and unlock the full potential of our platform. 
            Its quick, secure, and hassle-free!</p>
        </div>
        <div className="card">
          <div className="icon">
            <VscTasklist/>
          </div>
          <h4>Post or Browse Jobs</h4>
          <p>Looking for the perfect job opportunity or the 
            ideal candidate? Our platform allows you to post 
            jobs and connect with skilled professionals, or 
            browse job listings to find the right career move. 
            Whether you are an employer seeking top talent or a job
             seeker exploring new opportunities, we’ve got you covered!

</p>
        </div>
        <div className="card">
          <div className="icon">
            <BiSolidLike/>
          </div>
          <h4>Hire or get Hired </h4>
          <p>Find the best talent for your business 
            or take the next step in your career! 
            Employers can hire top professionals, 
            while job seekers can get hired for 
            roles that match their skills and experience.
             Join our growing network and start your journey today!</p>
        </div>
      </div>


    </section>
  )
}

export default HowItWorks
