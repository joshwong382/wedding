/* eslint-disable @next/next/no-img-element */
import { menuCourses, type MenuCourse } from "@/content/menu";
import { siteConfig } from "@/content/site";
import { HeartIcon } from "./heart-icon";

/**
 * Text alignment per column on desktop (md+):
 * col 0 = right-aligned, col 1 = centered, col 2 = left-aligned.
 * All are centered on mobile.
 */
const ALIGN_CLASSES: readonly [string, string, string] = [
  "text-center md:text-right",
  "text-center",
  "text-center md:text-left",
];

function CourseItems({ course }: { course: MenuCourse }) {
  return (
    <>
      {course.items.map((item) => (
        <div key={item.name}>
          <p className="mb-2 text-[var(--color-heading)]">
            <b>{item.name}</b>
          </p>
          {item.lines.map((line) => (
            <p key={line} className="mb-2 text-[var(--color-body-muted)]">
              {line}
            </p>
          ))}
        </div>
      ))}
    </>
  );
}

export function MenuSection() {
  const mainCourses = menuCourses.filter((c) => c.title !== "Late Night Station");
  const lateNight = menuCourses.filter((c) => c.title === "Late Night Station");

  return (
    <section id="menu" className="py-12">
      <div className="mx-auto max-w-[85%] pb-12">
        {/* Section title with decorative cover image */}
        <div className="section-title relative text-center" style={{ marginBottom: "inherit" }}>
          <div className="flex justify-center">
            <img
              src="/images/menu-cover.png"
              alt=""
              className="absolute top-0 left-1/2 -translate-x-1/2"
              style={{ maxHeight: "120%", maxWidth: "135%", objectFit: "cover" }}
              loading="lazy"
            />
            <div className="h-8" />
          </div>
          <h1
            className="section-heading font-display relative mb-4 text-[var(--color-heading)]"
            style={{ marginTop: "5rem" }}
          >
            {siteConfig.sections.menu.title}
          </h1>
          <div className="section-heart relative">
            <HeartIcon color="var(--color-heart-dark)" />
          </div>
        </div>

        {/* Three courses in a row */}
        <div className="mt-0 grid grid-cols-1 md:grid-cols-3">
          {mainCourses.map((course, i) => (
            <div key={course.title} className={ALIGN_CLASSES[i as 0 | 1 | 2]}>
              <h4
                className="mt-12 mb-2 font-display text-2xl text-[var(--color-heading)] underline"
              >
                {course.title}
              </h4>
              <CourseItems course={course} />
            </div>
          ))}
        </div>

        {/* Decorative image */}
        <div className="mt-4 flex justify-center">
          <img
            src="/images/menu-bot.png"
            alt=""
            className="max-h-[30vh] max-w-full object-cover"
            loading="lazy"
          />
        </div>

        {/* Late Night Station */}
        {lateNight.map((course) => (
          <div key={course.title} className="text-center">
            <h4
              className="mt-4 mb-2 font-display text-2xl text-[var(--color-heading)] underline"
            >
              {course.title}
            </h4>
            <CourseItems course={course} />
          </div>
        ))}

        {/* Bottom decorative image */}
        <div className="mt-4 flex justify-center">
          <img
            src="/images/menu-bot2.png"
            alt=""
            className="max-h-[50vh] max-w-full object-cover"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
