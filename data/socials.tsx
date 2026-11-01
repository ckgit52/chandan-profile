import { FaLinkedin } from "react-icons/fa6";
import { SiGithub, SiGmail, SiLeetcode } from "react-icons/si";
import { PROFILE } from "@/data/profile";
import { LinksProps } from "@/types/types";

export const SOCIAL_LINKS: LinksProps[] = [
  {
    link: PROFILE.github,
    Icon: <SiGithub className="size-4" />,
    name: "GitHub",
  },
  {
    link: PROFILE.linkedin,
    Icon: <FaLinkedin className="size-4" />,
    name: "LinkedIn",
  },
  {
    link: PROFILE.leetcode,
    Icon: <SiLeetcode className="size-4" />,
    name: "LeetCode",
  },
  {
    link: `mailto:${PROFILE.email}`,
    Icon: <SiGmail className="size-4" />,
    name: "Email",
  },
];
