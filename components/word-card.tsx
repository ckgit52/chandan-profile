import Image from "next/image";
import { Para } from "./para";
import { AvatarGroup } from "./ui/avatar-group";
import { techAvatars } from "./tech-icons";
import { WORK_COMPANIES_PROPS } from "@/types/types";

const WorkCard = ({
  companyName,
  companyLogo,
  role,
  duration,
  bullets,
  techStack,
}: WORK_COMPANIES_PROPS) => {
  return (
    <div className="flex gap-2">
      <div className="flex-4">
        <h3 className="text-ink-primary dark:text-ink-primary-dark mb-2 font-semibold tracking-tight">
          {companyName}
        </h3>
        <div className="mb-3 flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-2">
          <Para className="text-ink-primary dark:text-ink-primary-dark tracking-tight">
            {role}
          </Para>
          <Para>{duration}</Para>
        </div>
        <ul className="text-ink-secondary dark:text-ink-secondary-dark list-disc space-y-1.5 pl-4 text-sm marker:text-neutral-400">
          {bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
        <AvatarGroup
          className="mt-4 cursor-pointer select-none"
          avatarUrls={techAvatars(techStack)}
        />
      </div>
      <div className="hidden flex-1 sm:block">
        <Image
          src={companyLogo}
          alt={`${companyName} logo`}
          width={256}
          height={84}
          className="h-auto w-full max-w-37.5"
        />
      </div>
    </div>
  );
};

export default WorkCard;
