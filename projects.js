(() => {
  const projectList = document.querySelector("#project-list");
  const projectStatus = document.querySelector("#project-status");

  if (!projectList || !projectStatus) return;

  const projects = [
    {
      title: "Developer Portfolio",
      tags: ["HTML", "CSS", "JS"],
      description: "Responsive portfolio with a dark mode engine and zero layout shift.",
      href: "#",
      linkText: "Source Code",
      hiddenSuffix: " for Portfolio",
    },
    {
      title: "Web Drum Kit",
      tags: ["JavaScript", "Audio"],
      description: "Keyboard drum pads with polyphonic playback and a beat recorder.",
      href: "#",
      linkText: "Source Code",
      hiddenSuffix: " for Drum Kit",
    },
    {
      title: "Countdown Event Page",
      tags: ["JavaScript", "Forms"],
      description: "Drift-free countdown with a validated registration form.",
      href: "#",
      linkText: "Source Code",
      hiddenSuffix: " for Event Page",
    },
    {
      title: "Student Grade Table",
      tags: ["HTML", "CSS"],
      description: "Accessible data table with caption, scoped headers and responsive scroll.",
      href: "#",
      linkText: "Source Code",
      hiddenSuffix: " for Grade Table",
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
    const hiddenSuffix = document.createElement("span");
    hiddenSuffix.className = "visually-hidden";
    hiddenSuffix.textContent = project.hiddenSuffix;
    link.append(hiddenSuffix);
    card.append(heading, tags, description, link);
    listItem.append(card);
    return listItem;
  }

  function showLoading() {
    projectStatus.replaceChildren();
    projectStatus.removeAttribute("tabindex");
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
    projectStatus.setAttribute("tabindex", "-1");

    const message = document.createElement("span");
    const hint = document.createElement("span");
    message.textContent = "No projects to show yet.";
    hint.textContent = "Check back soon.";
    projectStatus.replaceChildren(message, document.createTextNode(" "), hint);
  }

  function showError() {
    projectList.replaceChildren();
    projectStatus.setAttribute("tabindex", "-1");

    const message = document.createElement("span");
    const retry = document.createElement("button");
    message.textContent = "Something went wrong while loading projects.";
    message.tabIndex = -1;
    retry.type = "button";
    retry.textContent = "Try again";
    retry.addEventListener("click", loadProjects);
    projectStatus.replaceChildren(message, document.createTextNode(" "), retry);
    message.focus();
  }

  async function fetchProjects() {
    await new Promise((resolve) => window.setTimeout(resolve, 300));
    return projects;
  }

  async function loadProjects() {
    showLoading();
    try {
      const loadedProjects = await fetchProjects();
      if (loadedProjects.length === 0) {
        showEmpty();
        return;
      }
      projectList.replaceChildren(...loadedProjects.map(renderProject));
      projectStatus.replaceChildren();
    } catch {
      showError();
    }
  }

  loadProjects();
})();
