const Noi = () => {
  return (
    <div className="px-6 h-screen overflow-y-auto no-scrollbar">
      <div className="flex flex-col gap-3 pt-24 pb-16">
        <video
          src="/noi_logo.mov"
          autoPlay
          loop
          muted
          className="w-full h-full object-fill"
          playsInline
        />
        <p className="text-secondary">
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
      </div>
    </div>
  );
};

export default Noi;
