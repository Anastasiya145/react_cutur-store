import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./breadCrumbs.scss";
import { CATEGORY_NAME_MAP } from "../../types/Pathnames";
import { IconHome } from "../Icons/IconHome";

export interface BreadcrumbItem {
  label: string;
  path: string;
  isActive: boolean;
}

export const BreadCrumbs: React.FC = () => {
  const location = useLocation();

  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const pathSegments = location.pathname
      .split("/")
      .filter((segment) => segment !== "");
    const breadcrumbs: BreadcrumbItem[] = [];

    // Always start with Home
    breadcrumbs.push({
      label: "Accueil",
      path: "/",
      isActive: pathSegments.length === 0,
    });

    // Build breadcrumbs from path segments
    let currentPath = "";
    pathSegments.forEach((segment, index) => {
      const decodedSegment = decodeURIComponent(segment);
      const displayName = CATEGORY_NAME_MAP[decodedSegment] || decodedSegment;

      currentPath += `/${segment}`;

      breadcrumbs.push({
        label: displayName.split("-").join(" "),
        path: currentPath,
        isActive: index === pathSegments.length - 1,
      });
    });

    return breadcrumbs;
  };

  const breadcrumbItems = generateBreadcrumbs();

  if (breadcrumbItems.length <= 1) {
    return null; // Don't show breadcrumbs on home page
  }

  return (
    <nav
      className="breadcrumbs"
      aria-label="Fil d'Ariane"
      data-cy="breadCrumbs"
    >
      <ol className="breadcrumbs__list">
        {breadcrumbItems.map((item, index) => (
          <li key={item.path} className="breadcrumbs__item">
            {item.isActive ? (
              <span className="breadcrumbs__current" aria-current="page">
                {item.label}
              </span>
            ) : (
              <Link
                to={item.path}
                className="breadcrumbs__link"
                title={`Aller à ${item.label}`}
              >
                {index === 0 && (
                  <IconHome
                    className="breadcrumbs__home-icon"
                    aria-hidden="true"
                    width="16"
                    height="16"
                  />
                )}
                <span className="breadcrumbs__text">{item.label}</span>
              </Link>
            )}
            {!item.isActive && (
              <span className="breadcrumbs__separator" aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M6 4L10 8L6 12"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};
