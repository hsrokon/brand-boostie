import { useState } from "react";
import Swal from "sweetalert2";

const socialLinks = [
  {
    platform: "facebook",
    url: "https://facebook.com/brandboostie",
    icon: "https://img.icons8.com/color/48/000000/facebook-new.png",
  },
  {
    platform: "x",
    url: "https://twitter.com/yourhandle",
    icon: "https://img.icons8.com/ios-filled/50/twitterx--v1.png",
  },
  {
    platform: "instagram",
    url: "https://instagram.com/yourhandle",
    icon: "https://img.icons8.com/fluency/48/instagram-new.png",
  },
  {
    platform: "linkedin",
    url: "https://linkedin.com/in/yourprofile",
    icon: "https://img.icons8.com/color/48/000000/linkedin.png",
  },
  {
    platform: "website",
    url: "https://yourwebsite.com",
    icon: "https://img.icons8.com/pulsar-gradient/48/globe.png",
  },
  {
    platform: "gmail",
    email: "your@email.com",
    icon: "https://img.icons8.com/fluency/48/mail--v1.png",
  },
];

const ConnectSection = () => {
  const handleEmailClick = (email) => {
    navigator.clipboard
      .writeText(email)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Email copied!",
          text: `Copied "${email}" and opening mail app...`,
          showConfirmButton: false,
          timer: 2500,
          toast: true,
          position: "top",
        });
      })
      .catch(() => {
        // fallback silent
      });

    window.location.href = `mailto:${email}`;
  };

  return (
    <section
      className="md:max-w-2xl -mt-10 mb-40 flex flex-col justify-center items-center space-y-6 mx-auto"
      data-aos="fade-up"
    >
      <h3 className="text-2xl md:text-3xl font-mono text-primary font-semibold">
        Connect with us
      </h3>
      <div className="flex gap-4">
        {socialLinks.map(({ platform, url, email, icon }) =>
          platform === "gmail" ? (
            <button
              key={platform}
              onClick={() => handleEmailClick(email)}
              className="w-9 h-9 bg-secondary/20 rounded-sm shadow flex items-center justify-center hover:bg-accent/40 transition"
              title="Email Us"
            >
              <img
                src={icon}
                alt="email"
                className="w-7 h-7"
              />
            </button>
          ) : (
            <a
              key={platform}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 bg-secondary/20 rounded-sm shadow flex items-center justify-center hover:bg-accent/40 transition"
              title={platform}
            >
              <img
                src={icon}
                alt={platform}
                className="w-7 h-7"
              />
            </a>
          )
        )}
      </div>
    </section>
  );
};

export default ConnectSection;
