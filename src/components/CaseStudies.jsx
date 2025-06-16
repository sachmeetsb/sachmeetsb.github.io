import React from 'react';
import { useSpring, animated } from 'react-spring';
import { FaChartLine, FaRocket, FaCogs, FaArrowRight, FaBriefcase, FaPhotoVideo } from 'react-icons/fa';

function CaseStudies() {
  const fadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 1000 },
  });

  const caseStudies = [
    {
      title: "Manufacturing Excellence",
      industry: "Manufacturing",
      challenge: "Manual quality control process with 85% accuracy",
      solution: "Implemented computer vision AI for automated quality inspection",
      results: [
        "78% inspection accuracy",
        "73% reduction in quality control time",
        "30% annual cost savings"
      ],
      icon: <FaCogs className="text-4xl mb-4" />
    },
    {
      title: "Rendering On-Demand Media Generation at Scale",
      industry: "Marketing / Architecture",
      challenge: "Self-hosted method for Multimodal Media Generation including renders, advertisement material, audio clips and 3D artifacts",
      solution: "AI-powered Generative Frameworks including Diffusion and Audio Models via PyTorch",
      results: [
        "90% reduction in processing time for media generation",
      ],
      icon: <FaPhotoVideo className="text-4xl mb-4" />
    },
    {
      title: "Scaling Legal",
      industry: "Legal",
      challenge: "Creating a scalable process for SMEs and individuals to send legal notices at fractional costs",
      solution: "Innovative End to End Solution for Filing and Sending Notices",
      results: [
        "87% lower in charges",
        "30% time savings for lawyers",
        "2.3x revenue growth due to scaling number of clients"
      ],
      icon: <FaBriefcase className="text-4xl mb-4" />
    }
  ];

  return (
    <section className="py-16 bg-black/70">
      <div className="container mx-auto px-4">
        <animated.div style={fadeIn}>
          <h2 className="text-3xl font-bold text-center mb-4 text-primary">Success Stories</h2>
          <p className="text-lg text-center mb-12 text-secondary">
            Real results from real businesses transforming with AI
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <div 
                key={index}
                className="bg-secondary text-tertiary p-6 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="text-primary flex justify-center">
                  {study.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 text-center">{study.title}</h3>
                <p className="text-sm text-tertiary/80 mb-4 text-center">{study.industry}</p>
                
                <div className="mb-4">
                  <h4 className="font-semibold mb-1">Challenge:</h4>
                  <p className="text-sm text-tertiary/90">{study.challenge}</p>
                </div>
                
                <div className="mb-4">
                  <h4 className="font-semibold mb-1">Solution:</h4>
                  <p className="text-sm text-tertiary/90">{study.solution}</p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Results:</h4>
                  <ul className="text-sm space-y-1">
                    {study.results.map((result, idx) => (
                      <li key={idx} className="flex items-center">
                        <span className="text-tertiary/90">• {result}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button 
              className="inline-flex items-center bg-primary text-secondary px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors duration-300 shadow-lg hover:shadow-xl"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Transform Your Business
              <FaArrowRight className="ml-2" />
            </button>
          </div>
        </animated.div>
      </div>
    </section>
  );
}

export default CaseStudies;
