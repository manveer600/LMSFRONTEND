import {BsFacebook, BsInstagram, BsLinkedin, BsGithub} from "react-icons/bs";
function Footer(){
    const currentDate = new Date();
    // console.log(currentDate);
    const year = currentDate.getFullYear();
    return(
        <>
            <footer className="bottom-0 text-center mt-10  space-y-2  py-5 flex flex-col sm:flex-row items-center justify-between text-white bg-gray-800 sm:px-20">
                <section className="text-lg text-red">
                    Copyright {year} | All rights reserved
                </section>
    
            <section className="flex items-center justify-center gap-5 text-2xl text-white">
                <a target="_blank" href="https://www.facebook.com/profile.php?id=100018265411159" className="hover:text-yellow-500 ">
                    <BsFacebook/>
                </a>
                <a target="_blank" href="https://www.instagram.com/manveersingh.23" className="hover:text-yellow-500">
                    <BsInstagram/>
                </a>
                <a target="_blank" href="https://www.linkedin.com/in/manveer-singh-5421041b4/"className="hover:text-yellow-500">
                    <BsLinkedin/>
                </a>
                <a target="_blank" href="https://github.com/manveer600"  className="hover:text-yellow-500">
                    <BsGithub/>
                </a>
            </section>
            
            </footer>
        </>
    )
}

export default Footer;