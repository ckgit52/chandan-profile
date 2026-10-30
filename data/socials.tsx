import { FaLinkedin } from "react-icons/fa6";
import { SiGithub, SiGmail, SiLeetcode } from "react-icons/si";
import { PROFILE } from "@/data/profile";
import { LinksProps } from "@/types/types";

/*
 * TODO: replace the three profile links below with your own URLs
 * (the resume's hyperlinks didn't survive the copy/paste).
 */
export const SOCIAL_LINKS: LinksProps[] = [
  {
    link: "https://github.com/",
    Icon: <SiGithub className="size-4" />,
    name: "GitHub",
  },
  {
    link: "https://www.linkedin.com/",
    Icon: <FaLinkedin className="size-4" />,
    name: "LinkedIn",
  },
  {
    link: "https://leetcode.com/",
    Icon: <SiLeetcode className="size-4" />,
    name: "LeetCode",
  },
  {
    link: `mailto:${PROFILE.email}`,
    Icon: <SiGmail className="size-4" />,
    name: "Email",
  },
];
