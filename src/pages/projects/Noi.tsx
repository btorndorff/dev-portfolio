import { NoiLogo } from "@/components/NoiLogo";
import { useCursorTooltip } from "@/context/CursorTooltipContext";
import { LinkIcon } from "@phosphor-icons/react";

const Noi = () => {
  const { setTooltip } = useCursorTooltip();
  return (
    <div className="px-6 h-screen overflow-y-auto no-scrollbar">
      <div className="flex flex-col gap-3 pt-24 pb-16 space-y-3">
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
        <p className="">
          Back in September I decided to restart my vietnamese language learning
          after having stopped earlier in the year and started working with a
          tutor twice a week on my Vietnamese. Very quickly I realized even
          though I could understand a lot of the vietnamese I was hearing and
          reading, I was miserable at speaking it especially with correct
          pronopunciation and at natural speeds. Two lessons a week wasn't
          enough for me to really the practice I needed for speaking and moreso
          I just really needed more frequent consistent practice for output.
          This is where the Noi was born, from this need for way more speaking
          practice.
        </p>

        <div className="w-full h-48 flex items-center justify-center">
          <NoiLogo width={100} height={100} />
        </div>
      </div>
    </div>
  );
};

export default Noi;
