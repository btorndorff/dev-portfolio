import { NoiLogo } from "@/components/NoiLogo";
import { useCursorTooltip } from "@/context/CursorTooltipContext";
import { LinkIcon } from "@phosphor-icons/react";

const Noi = () => {
  const { setTooltip } = useCursorTooltip();

  return (
    <div className="flex flex-col gap-3 space-y-3">
      <div className="flex items-center gap-3">
        <h2 className="text-3xl font-bold">Noi</h2>
        <a
          href="https://noi.to"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-primary transition-colors duration-300"
          onMouseEnter={() => setTooltip("noi.to")}
          onMouseLeave={() => setTooltip(null)}
        >
          <LinkIcon size={20} weight="bold" />
        </a>
      </div>

      <a href="https://noi.to" target="_blank" rel="noopener noreferrer">
        <video
          src="https://assets.benorndorff.me/noi_demo.mov"
          autoPlay
          loop
          muted
          className="w-full h-full object-fill"
          playsInline
        />
      </a>

      <div className="text-sm space-y-3">
        <p>
          Back in September I restarted my Vietnamese Language Learning goal
          with one goal: <span className="italic">BE ABLE TO SPEAK</span>. In
          previous attempts although I learned a great deal my speaking was
          still constricted by poor pronunciation, slow speed, and a lack of
          vocab which effectively made me incoherent to any Vietnamese speaker.
          I started having lessons with my Vietnamese tutor twice a week but
          even then progress was still slow. I had to spend at least 15 minutes
          of each lesson warming up and repracticing everything from the last
          lesson before I could actually move on to new material. This is how
          Noi was born, from the need to practice speaking constantly and get
          real feedback on it. Noi is a language learning diary platform that
          allows users to do just that.
        </p>

        <div className="space-y-1">
          <h3 className="text-lg font-bold">How Noi Works</h3>
          <p>
            Noi is a language learning diary platform that allows users to
            record videos of themselves speaking their learning language and get
            feedback on them all in one place. The feedback is generated based
            on the transcript of the video and provides the user with some basic
            suggestions on how to fix grammar or it sound more natural. In the
            future I plan to add more advanced feedback features like actual
            pronunciation feedback and even conversational/situational roleplay
            entries.
          </p>
        </div>

        <p>
          Noi is fully fleshed out with proper auth and a frontend → backend
          pipeline to record, transcribe, and provide feedback on the videos. I
          heavily leaned into cloudflare for this project with the backend on a
          cloudflare worker connected to an D1 database and R2 bucket as well as
          the frontend on a cloudflare pages site. Other than that its been fun
          to work with tanstack, hono, and drizzle frameworks in this project
          getting to find out why everyone loves them so much.
        </p>

        <div className="space-y-1">
          <h3 className="text-lg font-bold">Flexing some design muscles</h3>
          <div className="w-full h-48 flex items-center justify-center">
            <NoiLogo width={100} height={100} />
          </div>
          <p>
            Aside from the language learning features, I had a blast designing
            Noi's UX/UI and brand from scratch. I had originally named this
            project "Mantra" for the idea of the ritual and constant practice
            required for language learning. However, it never felt like the
            right name so after a few weeks the name "Noi" or "speak" in
            vietnamese struck me and I rehauled the look around that. The hover
            logo with the speaking face for the O is something I'm really proud
            of and required a bit of fun SVG + motion magic. For the rest of the
            app I tried to keep it simple and playful and I feel it suprisingly
            turned out very unique and intuitive especially on mobile web.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Noi;
