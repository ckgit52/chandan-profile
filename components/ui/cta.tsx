"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "motion/react";
import { Block } from "../block";
import SharpBox from "../sharpBox";
import { ArrowRight02 } from "../animate-ui/icons/hugeicons/arrow-right-02";
import { PROFILE } from "@/data/profile";

export function CallToAction() {
  return (
    <Block>
      <SharpBox>
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex-1">
            <motion.h2
              initial={{ opacity: 0, y: 20, filter: "blur(12px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.3 }}
              className="text-ink-primary dark:text-ink-primary-dark mb-2 text-lg font-medium md:text-xl"
            >
              Need a fast, reliable Rust backend?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20, filter: "blur(12px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.4 }}
              className="text-ink-secondary dark:text-ink-secondary-dark text-sm"
            >
              {PROFILE.cta}
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20, filter: "blur(12px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.6 }}
          >
            <Button>
              <Link href="/contact" className="flex items-center gap-2">
                Start a Conversation{" "}
                <ArrowRight02 animateOnHover data-icon="inline-end" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </SharpBox>
    </Block>
  );
}
