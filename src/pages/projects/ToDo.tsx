import ProjectTemplate from '../../components/ProjectTemplate';

const ToDo = () => {
    const projectData = {
        title: "Eisenhower Matrix ToDo List",
        image: "/images/todo-preview.png",
        overview: "A simple to-do list that helps me prioritize tasks based on their urgency and importance. Completed in record time thanks to some new AI tools.",
        features: [
            "Eisenhower Matrix task organization",
            "Drag and drop task management",
            "multi task input powered by GPT-4o-mini"
        ],
        technologies: [
            { name: "React" },
            { name: "TypeScript" },
            { name: "Node.js" },
            { name: "DND Kit" },
            { name: "Bolt.new" }
        ],
        links: [
            {
                text: "GitHub",
                url: "https://github.com/btorndorff/ToDo"
            },
        ]
    };

    return (
        <ProjectTemplate {...projectData} >
            <section>
                <h2 className="text-2xl font-bold mb-4 dark:text-white">Learnings</h2>
                <div className="space-y-4 text-gray-600 dark:text-gray-300">
                    <p>My goals for this project were to 1) build a todo list I would actually use and 2) Write as little code for it as possible. 
                        I had been seeing online people using things like replit and bolt to one shot build full stack applications and thought 
                        I would try it out.</p>
                    <p>In my first attempt, I created a comprehensive PRD and API doc to feed into bolt, 
                        but I think there was too much for it to handle in a single prompt so that first attempt kept running into errors and no amount 
                        of continued prompting made it any better. I wasted a few hours trying to wrangle it together with bolt and then cursor before deciding 
                        to just restart. My second attempt I decided to ditch the docs and just give it a simple prompt with my desired tech stack, I think having 
                        to many conditions in the prompt causes these things to make more errors so just letting it choose its own methods is better. This was 
                        able to one shot a really good MVP and then after a bit more prompting in bolt and then finalizing in cursor (mostly the design) I had a satisfactory version of it. 
                        Was a very fun experience and I'm excited that this is the worst it will ever be, its only going to get better from here. </p>
                </div>
            </section>
        </ProjectTemplate>
    );
};

export default ToDo; 