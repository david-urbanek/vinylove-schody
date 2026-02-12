"use client";

import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";

import { RealizationForm } from "@/components/forms/realization-form";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { cn } from "@/lib/utils";

interface HeroProps {
  className?: string;
}

const Hero = ({ className }: HeroProps) => {
  return (
    <section
      className={cn("font-dm_sans bg-background py-12 md:py-20", className)}
    >
      <div className="container">
        <div className="grid grid-cols-1 items-center justify-center gap-20 lg:grid-cols-2">
          <div>
            <div className="flex max-w-[40.625rem] flex-col gap-8">
              <h1 className="font-serif text-4xl text-foreground lg:text-5xl xl:text-6xl">
                Vinylové schody a podlahy na míru
              </h1>
              <p className="text-lg text-balance text-muted-foreground">
                Kvalitní vinylové schody, podlahy a profesionální realizace pro
                váš domov. Zbavte se starostí a nechte to na nás.
              </p>
              <RealizationForm />

              <div className="flex flex-col gap-1.5 py-4">
                <div className="flex items-center gap-2">
                  <Check className="stroke-muted2-foreground size-4" />
                  <p className="text-lg font-medium text-foreground/60">
                    Doprava zdarma nad 2 000 Kč
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="stroke-muted2-foreground size-4" />
                  <p className="text-lg font-medium text-foreground/60">
                    Konzultace zdarma
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="stroke-muted2-foreground size-4" />
                  <p className="text-lg font-medium text-foreground/60">
                    Přes dvacet let na trhu
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="relative mx-auto aspect-[0.990343348/1] w-full max-w-[42.5rem]">
              <div className="absolute top-[5.04%] left-[4.33%] z-2 w-[42.25%]">
                <AspectRatio
                  ratio={0.857142857 / 1}
                  className="overflow-hidden"
                >
                  <img
                    src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg"
                    alt=""
                    className="block size-full object-cover"
                  />
                </AspectRatio>
              </div>

              <div className="absolute right-[8.23%] bottom-[12.87%] z-2 w-[42.25%]">
                <AspectRatio
                  ratio={0.789473684 / 1}
                  className="overflow-hidden"
                >
                  <img
                    src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg"
                    alt=""
                    className="block size-full object-cover"
                  />
                </AspectRatio>
              </div>

              <div className="absolute bottom-[5%] left-[10.94%] z-3 w-[42.25%]">
                <AspectRatio
                  ratio={0.894495413 / 1}
                  className="overflow-hidden"
                >
                  <img
                    src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-3.svg"
                    alt=""
                    className="block size-full object-cover"
                  />
                </AspectRatio>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.5,
                  delay: 1,
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                }}
                className="absolute top-[15%] right-[16%] size-[4%]"
              >
                <Star className="size-full stroke-sky-500" />
              </motion.div>
              <motion.svg
                className="absolute top-[10%] left-0 z-1 w-[70%]"
                viewBox="0 0 588 655"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <motion.path
                  d="M319 645.463C229 659.797 41.4 652.163 11 506.963C-27 325.463 100.5 299.463 177 288.963C253.5 278.463 341.5 307 454.5 288.963C486.365 283.877 585 242.009 583.5 119.009C582.3 20.6093 583 2.5 583 0.498047"
                  stroke="#5DCA8A"
                  strokeWidth="8"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                />
              </motion.svg>
              <motion.svg
                className="absolute bottom-0 left-[5%] z-2 w-[7%]"
                viewBox="0 0 62 62"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <motion.path
                  d="M36 3L18 5.5M42.5 18L2 42M49.5 28.5L32.5 52M58.5 34L56 61"
                  stroke="#5DCA8A"
                  strokeWidth="6"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
                />
              </motion.svg>
              <motion.svg
                className="absolute top-0 left-0 size-[6%] stroke-amber-500"
                viewBox="0 0 153 200"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                initial={{ opacity: 0 }}
                animate={{ opacity: [1, 0.4, 1] }}
                transition={{
                  duration: 2,
                  delay: 0.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <motion.path
                  d="M72 9C68.4932 44.3333 50.7836 115 8 115"
                  strokeWidth="15"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
                />
                <motion.path
                  d="M72 192C76 163.333 96.2 106 145 106"
                  strokeWidth="15"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, ease: "easeInOut", delay: 0.4 }}
                />
                <motion.path
                  d="M72 8C76 40.6667 96.2 106 145 106"
                  strokeWidth="15"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, ease: "easeInOut", delay: 0.6 }}
                />
                <motion.path
                  d="M72 192C68.4931 166.333 50.7836 115 8 115"
                  strokeWidth="15"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, ease: "easeInOut", delay: 0.8 }}
                />
              </motion.svg>
              <motion.svg
                className="absolute right-[2%] bottom-[3.5%] w-[12%]"
                viewBox="0 0 111 109"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
              >
                <path
                  d="M80.7298 64.2409C79.8305 65.844 77.5907 69.3884 74.4111 72.8859C71.2651 76.4113 67.183 79.817 63.7301 82.0851C61.7439 83.4125 59.6722 84.6193 57.5273 85.6817C56.4581 86.2136 55.372 86.6747 54.2912 87.1704C53.207 87.652 52.0948 88.0533 51.0005 88.4923C46.5667 90.148 42.0082 91.3659 37.4134 92.2539C28.2113 94.0268 18.9309 94.5091 9.76702 94.6103C6.8995 94.6457 2.04267 94.7689 2.10262 93.2898C2.16332 91.7506 5.38459 90.7806 10.3362 90.6529C16.3325 90.4964 22.3213 90.2577 28.2441 89.5883C34.1657 88.9522 40.0216 87.7984 45.5911 85.9545C49.648 84.5918 53.6182 82.9142 57.3198 80.8988C61.0082 78.8535 64.4708 76.3735 67.5837 73.5299C70.6917 70.6785 73.4641 67.4603 75.7326 63.936C77.9948 60.4103 79.7498 56.5644 80.7419 52.5457C81.6559 48.944 81.912 45.2076 81.5287 41.5417C81.4193 40.612 81.3121 39.7297 81.0978 38.8758C80.8913 38.017 80.636 37.1668 80.31 36.3603C79.6553 34.7599 78.7493 33.288 77.5814 32.3035C76.4385 31.2981 75.0339 30.8071 73.5918 30.9032C72.1463 30.985 70.6396 31.6685 69.3543 32.6921C68.7116 33.2038 68.1224 33.8018 67.6081 34.4509C67.3502 34.7786 67.1114 35.1108 66.9032 35.4837C66.6964 35.8502 66.4531 36.2014 66.2703 36.5803C65.512 38.096 65.1136 39.7902 64.9573 41.5078C64.4395 48.0084 68.1788 54.9143 73.9006 57.7466C76.797 59.2112 80.1285 59.7939 83.4301 59.5928C85.0891 59.5143 86.7238 59.1689 88.3335 58.7306C89.9399 58.2781 91.4783 57.602 92.9569 56.8383C95.4892 55.4384 97.7493 53.6867 99.6167 51.4408C101.478 49.2203 103.027 46.6784 104.105 43.9187C105.206 41.1712 105.924 38.2331 106.219 35.2424C106.396 33.7505 106.409 32.2405 106.39 30.7292C106.316 29.2188 106.207 27.7199 105.943 26.2248C105.727 24.808 105.294 23.2868 104.791 21.7554C104.273 20.2275 103.655 18.6962 103.068 17.2388C102.126 14.8076 100.075 10.9438 98.7361 8.6937C98.1755 7.71813 97.5637 6.70374 96.8779 5.83268C95.2833 3.84388 94.3027 2.57537 94.0608 1.7819C93.8174 0.99478 94.2891 0.697275 95.4958 0.833768C96.0295 0.899034 96.1168 0.243258 97.1261 1.07659C97.1645 1.11242 97.2493 1.17922 97.2877 1.21505C100.523 3.6568 102.459 7.32622 104.389 10.9072C106.78 15.3197 108.617 20.0909 109.571 25.0895C110.536 30.0974 110.528 35.3118 109.46 40.337C108.395 45.3496 106.238 50.2193 102.902 54.2423C101.251 56.2512 99.2665 58.0544 97.0732 59.4938C94.8847 60.941 92.4909 62.0654 89.9862 62.8356C88.4564 63.3329 86.862 63.6208 85.2619 63.8471C83.653 63.9977 82.0272 64.0773 80.4014 63.9293C77.1628 63.6631 73.9157 62.7788 71.0633 61.0701C68.1762 59.3665 65.7929 56.9445 64.0497 54.1641C62.3314 51.3628 61.2107 48.2132 60.801 44.9161C60.6224 43.1131 60.5427 41.2596 60.8632 39.4132C60.9609 38.4853 61.2549 37.5769 61.5206 36.6751C61.6485 36.2164 61.8814 35.7958 62.065 35.3568C62.2676 34.9224 62.4449 34.4819 62.7191 34.0844L62.6852 34.1434C63.5965 32.3757 64.8698 30.7199 66.4387 29.4015C68.0125 28.091 69.9233 27.0271 72.1343 26.6231C74.224 26.2508 76.5556 26.5581 78.461 27.5955C80.4135 28.6038 81.8569 30.1821 82.9297 31.8272C83.9712 33.4917 84.7152 35.2536 85.1957 37.0541C85.4533 37.9517 85.6258 38.8694 85.7744 39.7749C85.8801 40.6635 86.0142 41.5454 86.052 42.4382C86.1891 44.2181 86.165 46.0003 86.0125 47.759C85.8791 49.5221 85.5792 51.2528 85.1871 52.9484C84.4028 56.3397 83.1368 59.5305 81.6016 62.4706C81.3769 62.9133 81.1142 63.5747 80.7298 64.2409Z"
                  fill="#0F1F2C"
                />
              </motion.svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Hero };
