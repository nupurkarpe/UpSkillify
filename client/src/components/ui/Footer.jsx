import { Facebook, Instagram, School, Twitter } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-slate-800 text-white py-10 mt-10">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Company Info */}
        <div>
          <div className="flex gap-2 items-center">
            <School size={"35"} />
            <div className="flex flex-col leading-none">
              <h1 className="text-xl font-bold">UpSkillify</h1>
              <p className="text-sm text-gray-400">See beyond, Learn Beyond</p>
            </div>
          </div>
          <br />

          {/* <h4 className="text-xl font-semibold mb-2">Leo Properties</h4> */}
          <p>Lotus Corporate Park</p>
          <p>Goregaon,Mumbai, Maharashtra, 400060</p>
          <p>India</p>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-xl font-semibold mb-2">Contact Us</h4>
          <p>Phone: +1 (555) 123-4567</p>
          <p>Telephone: +1 (555) 987-6543</p>
          <p>Email: upskillify@gmail.com</p>
        </div>

        {/* Social Media Links */}
        <div>
          <h4 className="text-xl font-semibold mb-2">Follow Us</h4>
          <div className="flex space-x-4">
            <a
              href="https://facebook.com/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Facebook className="text-white hover:text-blue-500" size={24} />
            </a>
            <a
              href="https://twitter.com/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Twitter className="text-white hover:text-blue-400" size={24} />
            </a>
            <a
              href="https://www.instagram.com/leo_property4u?igsh=MW40enpieGd6OGZoZw=="
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram className="text-white hover:text-pink-400" size={24} />
            </a>
          </div>
        </div>

        {/* Additional Information */}
        <div>
          <h4 className="text-xl font-semibold mb-2">About Us</h4>
          <p className="text-sm">
            At UpSkillify, we believe in empowering individuals to push the
            boundaries of learning and growth. Our mission is to provide
            high-quality courses and tools that help learners acquire the skills
            they need to excel in their personal and professional lives.
          </p>
        </div>
      </div>
      <div className="text-center text-sm mt-8">
        &copy; {new Date().getFullYear()} UpSkillify. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;
