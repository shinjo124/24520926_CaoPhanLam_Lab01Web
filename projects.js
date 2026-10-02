(() => {
  const projectList = document.querySelector("#project-list");
  const projectStatus = document.querySelector("#project-status");

  if (!projectList || !projectStatus) return;

  const mockProjects = [
    {
      title: "Developer Portfolio",
      tags: ["HTML", "CSS", "JavaScript"],
      description:
        "A responsive portfolio showcasing accessible web design and frontend development.",
      href: "https://github.com/your-username/portfolio-website",
      linkText: "View the Developer Portfolio source code",
    },
    {
      title: "Responsive Project Gallery",
      tags: ["CSS Grid", "Accessibility"],
      description:
        "A flexible project gallery designed to adapt from mobile screens to desktop layouts.",
      href: "https://github.com/your-username/project-gallery",
      linkText: "View the Responsive Project Gallery source code",
    },
  ];

  function renderProject(project, index) {
    const listItem = document.createElement("li");
    const card = document.createElement("article");
    const heading = document.createElement("h3");
    const tags = document.createElement("ul");
    const description = document.createElement("p");
    const link = document.createElement("a");
    const headingId = `project-title-${index + 1}`;

    card.className = "project-card";
    card.setAttribute("aria-labelledby", headingId);
    heading.id = headingId;
    heading.textContent = project.title;

    tags.className = "project-tags";
    tags.setAttribute("aria-label", "Technologies used");
    project.tags.forEach((tag) => {
      const tagItem = document.createElement("li");
      const badge = document.createElement("span");
      badge.textContent = tag;
      tagItem.append(badge);
      tags.append(tagItem);
    });

    description.textContent = project.description;
    link.href = project.href;
    link.textContent = project.linkText;
    card.append(heading, tags, description, link);
    listItem.append(card);
    return listItem;
  }

  function showLoading() {
    projectStatus.textContent = "Loading projects.";
    projectList.replaceChildren();

    for (let index = 0; index < 3; index += 1) {
      const skeleton = document.createElement("li");
      skeleton.className = "project-skeleton";
      skeleton.setAttribute("aria-hidden", "true");
      projectList.append(skeleton);
    }
  }

  function showEmpty() {
    projectList.replaceChildren();

    const message = document.createElement("span");
    const hint = document.createElement("span");
    message.textContent = "No projects to display yet.";
    hint.textContent = "Check back later for new work.";
    projectStatus.replaceChildren(message, document.createTextNode(" "), hint);
  }

  async function loadProjects() {
    showLoading();
    await new Promise((resolve) => window.setTimeout(resolve, 300));
    if (mockProjects.length === 0) {
      showEmpty();
      return;
    }
    projectList.replaceChildren(...mockProjects.map(renderProject));
    projectStatus.textContent = `${mockProjects.length} projects loaded.`;
  }

  loadProjects();
})();
