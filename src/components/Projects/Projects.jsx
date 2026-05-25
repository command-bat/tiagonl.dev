"use client";

import styles from "./Projects.module.css";

import { useEffect, useMemo, useRef, useState } from "react";

import {
  FaGithub,
  FaGlobe,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

import ProjectModal from "./ProjectModal";

import splitProjects from "@/utils/splitProjects";

export default function Projects({
    onLoaded,
    onProjectsChange,
}) {
  const [loading, setLoading] = useState(true);

  const [data, setData] = useState(null);

  const [hasProject, setHasProject] = useState(false);

  const [selectedFilter, setSelectedFilter] = useState([]);

  const [selectedProject, setSelectedProject] = useState(null);

  const [dragging, setDragging] = useState(false);

  const rowsRef = useRef([]);

  const isPointerDown = useRef(false);

  const startX = useRef(0);

  const startScroll = useRef(0);

  const autoScrollPaused = useRef(false);

  const autoAnimation = useRef(null);

  const activeFilters = Array.isArray(selectedFilter)
  ? selectedFilter
  : selectedFilter
    ? [selectedFilter]
      : [];
  
useEffect(() => {
  let cancelled = false;

  let finishedInitialLoading = false;

  async function load(retry = 0) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND}/api/github/projects`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error("Erro ao buscar projetos");
      }

      const json = await response.json();

      if (cancelled) return;

      setData(json);

      const hash = window.location.hash.replace("#", "").toLowerCase();

      if (hash) {
        const foundProject = json.projects.find((project) => {
          const projectId =
            project.github?.split("/").pop()?.toLowerCase() ||
            project.title.toLowerCase().replace(/\s+/g, "-");

          return projectId === hash;
        });

        if (foundProject) {
          setSelectedProject(foundProject);
        }
      }

      setHasProject(true);
        
      onProjectsChange?.(true)

      if (!finishedInitialLoading) {
        finishedInitialLoading = true;

        setLoading(false);

        onLoaded?.();
      }
    } catch (error) {
      console.log(`Tentativa ${retry + 1} falhou`, error);

      if (cancelled) return;

      // PRIMEIRAS 7 TENTATIVAS (50ms)
      if (retry < 7) {
        setTimeout(() => {
          load(retry + 1);
        }, 50);

        // terminou as tentativas rápidas
        if (retry === 6 && !finishedInitialLoading) {
          finishedInitialLoading = true;

          setLoading(false);

          onLoaded?.();
        }

        return;
      }

      // MAIS 19 TENTATIVAS
      if (retry < 26) {
        setTimeout(() => {
          load(retry + 1);
        }, (50+(retry*50)*(retry)));

        return;
      }

      // FALHOU TODAS
      if (!finishedInitialLoading) {
        finishedInitialLoading = true;

        setLoading(false);

        onLoaded?.();
      }

      setData(null);

      setHasProject(false);
        
      onProjectsChange?.(false);
    }
  }

  load();

  return () => {
    cancelled = true;
  };
}, []);

  useEffect(() => {
function handleFilter(e) {
  const detail = e.detail;

  if (detail?.type === "replace") {
    setSelectedFilter(detail.filters || []);
  }

  document.getElementById("projects")?.scrollIntoView({
    behavior: "smooth",
  });
}

    window.addEventListener("filter-projects", handleFilter);

    return () => {
      window.removeEventListener("filter-projects", handleFilter);
    };
  }, []);

const filteredProjects =
  data?.projects.filter((project) => {
    if (activeFilters.length === 0) {
      return true;
    }

    return activeFilters.every((filter) => project.tags.includes(filter));
  }) || [];

  const rows = useMemo(() => {
    return splitProjects(filteredProjects, 12);
  }, [filteredProjects]);

  useEffect(() => {
    if (activeFilters.length > 0) return;

    function animate() {
      if (!autoScrollPaused.current) {
        rowsRef.current.forEach((row) => {
          if (!row) return;

          row.scrollLeft += 0.7;

          const limit = row.scrollWidth / 2;

          if (row.scrollLeft >= limit) {
            row.scrollLeft -= limit;
          }

          if (row.scrollLeft <= 0) {
            row.scrollLeft += limit;
          }
        });
      }

      autoAnimation.current = requestAnimationFrame(animate);
    }

    autoAnimation.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(autoAnimation.current);
    };
  }, [selectedFilter, rows]);


  function formatFilters(filters) {
  if (filters.length === 1) {
    return filters[0];
  }

  return (
    filters.slice(0, -1).join(", ") +
    " e " +
    filters[filters.length - 1]
  );
  }
  

  function syncScroll(value) {
    rowsRef.current.forEach((row) => {
      if (!row) return;

      row.scrollLeft = value;

      if (!selectedFilter) {
        const middle = row.scrollWidth / 2;

        if (row.scrollLeft >= middle) {
          row.scrollLeft -= middle;
        }

        if (row.scrollLeft <= 0) {
          row.scrollLeft += middle;
        }
      }
    });
  }

  function handlePointerDown(e) {
    isPointerDown.current = true;

    autoScrollPaused.current = true;

    setDragging(false);

    startX.current = e.clientX;

    startScroll.current = rowsRef.current[0]?.scrollLeft || 0;
  }

  function handlePointerMove(e) {
    if (!isPointerDown.current) return;

    const delta = e.clientX - startX.current;

    const walk = delta * 1.05;

    if (Math.abs(walk) > 5) {
      setDragging(true);
    }

    syncScroll(startScroll.current - walk);
  }

  function handlePointerUp() {
    isPointerDown.current = false;

    setTimeout(() => {
      setDragging(false);
    }, 800);

    setTimeout(() => {
      autoScrollPaused.current = false;
    }, 1200);
  }

  function scroll(dir) {
    autoScrollPaused.current = true;

    const amount = window.innerWidth < 700 ? 320 : 600;

    rowsRef.current.forEach((row) => {
      if (!row) return;

      const target = row.scrollLeft + (dir === "left" ? -amount : amount);

      animateScroll(row, target);
    });

    setTimeout(() => {
      autoScrollPaused.current = false;
    }, 1500);
  }

  function animateScroll(element, target) {
    const start = element.scrollLeft;

    const distance = target - start;

    const duration = 450;

    let startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;

      const progress = timestamp - startTime;

      const percent = Math.min(progress / duration, 1);

      const ease = 1 - Math.pow(1 - percent, 3);

      element.scrollLeft = start + distance * ease;

      if (percent < 1) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  }

  if (loading) {
    return <section className={styles.loading}>carregando projetos...</section>;
    }
    
    if (!hasProject) {
      return (<></>);
    }

  return (
    <section id="projects" className={styles.projects}>
      <div className={styles.top}>
        <h2>Projetos</h2>

        <div className={styles.filters}>
          {data.filters.map((filter) => (
            <button
              key={filter}
              onClick={() => {
                setSelectedFilter((prev) => {
                  if (prev.includes(filter)) {
                    return prev.filter((item) => item !== filter);
                  }

                  return [...prev, filter];
                });
              }}
              className={activeFilters.includes(filter) ? styles.active : ""}
            >
              {filter}
            </button>
          ))}
          <button
            key={"limpar"}
            onClick={() => setSelectedFilter([])}
            className={activeFilters.length > 0 ? styles.active : ""}
          >
            {"Remover todos os filtros"}
          </button>
        </div>
      </div>

      {filteredProjects.length === 0 && activeFilters.length > 0 && (
        <div className={styles.empty}>
          <h3>Projeto não público</h3>

          <p>
            Alguns projetos relacionados a{" "}
            {formatFilters(activeFilters).toLowerCase()} podem ser privados ou
            ainda não publicados.
          </p>
        </div>
      )}

      {filteredProjects.length > 0 && (
        <div className={styles.wrapper}>
          <button
            className={`${styles.arrow} ${styles.left}`}
            onClick={() => scroll("left")}
          >
            <FaChevronLeft />
          </button>

          <div className={styles.rows}>
            {rows.map((row, rowIndex) => (
              <div
                key={rowIndex}
                className={styles.carousel}
                ref={(el) => (rowsRef.current[rowIndex] = el)}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerLeave={handlePointerUp}
              >
                {(activeFilters.length > 0
                  ? row
                  : [...row, ...row, ...row]
                ).map((project, index) => (
                  <div
                    key={`${project.github}-${index}`}
                    className={styles.card}
                    onClick={() => {
                      if (!dragging && !isPointerDown.current) {
                        const projectId =
                          project.github?.split("/").pop()?.toLowerCase() ||
                          project.title.toLowerCase().replace(/\s+/g, "-");

                        window.history.replaceState(null, "", `#${projectId}`);

                        setSelectedProject(project);
                      }
                    }}
                  >
                    <h3>{project.title}</h3>

                    <p>{project.description}</p>

                    <div className={styles.tags}>
                      {project.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>

                    <div className={styles.links}>
                      {project.site && (
                        <a
                          href={project.site}
                          target="_blank"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <FaGlobe />
                        </a>
                      )}

                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <FaGithub />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <button
            className={`${styles.arrow} ${styles.right}`}
            onClick={() => scroll("right")}
          >
            <FaChevronRight />
          </button>
        </div>
      )}

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => {
            window.history.replaceState(null, "", window.location.pathname);

            setSelectedProject(null);
          }}
        />
      )}
    </section>
  );
}
