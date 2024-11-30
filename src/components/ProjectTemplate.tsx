import { Link } from 'react-router-dom';

interface Technology {
    name: string;
}

interface ProjectLink {
    text: string;
    url: string;
}

interface ProjectTemplateProps {
    title: string;
    overview: string;
    features: string[];
    technologies: Technology[];
    links: ProjectLink[];
    children?: React.ReactNode;
    video?: string;
    image?: string;
}

const ProjectTemplate = ({ 
    title, 
    overview, 
    features, 
    technologies, 
    links,
    children,
    video,
    image
}: ProjectTemplateProps) => {
    return (
        <main className="max-w-3xl mx-auto px-6 h-[calc(100vh-64px)] mt-16 relative">
            <div className="h-full overflow-y-auto no-scrollbar">
                <Link 
                    to="/projects" 
                    className="inline-flex items-center text-blue-600 dark:text-blue-400 mb-6 hover:underline"
                >
                    ← Back to Projects
                </Link>

                <h1 className="text-5xl font-bold mb-8 dark:text-white">
                    {title}
                </h1>

                {video && (
                    <div className="mb-12">
                        <div className="relative pt-[56.25%]">
                            <iframe
                                className="absolute top-0 left-0 w-full h-full rounded-lg"
                                src={video}
                                title={`${title} Demo Video`}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                    </div>
                )}

                {image && (
                    <div className="mb-12">
                        <img
                            src={image}
                            alt={`${title} Screenshot`}
                            className="w-full rounded-lg"
                        />
                    </div>
                )}

                <div className="space-y-12 mb-16">
                    <section>
                        <h2 className="text-2xl font-bold mb-4 dark:text-white">Overview</h2>
                        <p className="text-gray-600 dark:text-gray-300">
                            {overview}
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4 dark:text-white">Key Features</h2>
                        <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
                            {features.map((feature, index) => (
                                <li key={index}>{feature}</li>
                            ))}
                        </ul>
                    </section>

                    {children}

                    <section>
                        <h2 className="text-2xl font-bold mb-4 dark:text-white">Technologies Used</h2>
                        <div className="flex flex-wrap gap-2">
                            {technologies.map((tech, index) => (
                                <span 
                                    key={index} 
                                    className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-sm dark:text-gray-300"
                                >
                                    {tech.name}
                                </span>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4 dark:text-white">Links</h2>
                        <div className="space-x-4">
                            {links.map((link, index) => (
                                <a 
                                    key={index}
                                    href={link.url} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-blue-600 dark:text-blue-400 hover:underline"
                                >
                                    {link.text}
                                </a>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
};

export default ProjectTemplate; 