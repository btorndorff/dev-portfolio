import { Link } from 'react-router-dom';

interface ProjectCardProps {
    title: string;
    description: string;
    link: string;
    imageUrl?: string;
}

const ProjectCard = ({ title, description, link, imageUrl }: ProjectCardProps) => {
    return (
        <Link to={link} className="block">
            <div className="border-2 border-gray-300 dark:border-gray-600 rounded-lg shadow hover:shadow-md transition-shadow h-full flex flex-col">
                {imageUrl && (
                    <img src={imageUrl} alt={title} className="w-full h-48 object-cover rounded-t-lg" />
                )}
                <div className="p-6 flex flex-col flex-1">
                    <h2 className="text-2xl font-bold mb-4 dark:text-white">{title}</h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 flex-1">
                        {description}
                    </p>
                    <div className="flex items-center text-blue-600 dark:text-blue-400">
                        Learn more →
                    </div>
                </div>
            </div>
        </Link>
    );
};

const Projects = () => {
    return (
        <main className="max-w-3xl mx-auto px-6 h-[calc(100vh-64px)] mt-16 relative">
            <div className="h-full overflow-y-auto md:overflow-y-hidden no-scrollbar">
                <h1 className="text-5xl font-bold mb-20 dark:text-white pt-8">
                    Projects
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    <ProjectCard
                        title="Langoo"
                        description="A personal language learning dashboard with the goal of becoming a one-stop-shop for all your language learning needs."
                        link="/projects/langoo"
                    />

                    <ProjectCard
                        title="LangCard"
                        description="Generative language learning flashcards powered by AI to help create effective study materials."
                        link="/projects/langcard"
                    />

                    <ProjectCard
                        title="Eisenhower Matrix ToDo List"
                        description="A simple to-do list that helps you prioritize tasks based on their urgency and importance. Completed in record time thanks to some new AI tools."
                        link="/projects/todo"
                    />
                </div>
            </div>
        </main>
    );
};

export default Projects;