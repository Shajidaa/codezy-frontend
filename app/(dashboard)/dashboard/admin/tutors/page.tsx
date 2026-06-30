"use client";

import React, { useEffect, useState } from "react";

// --- Types & Interfaces ---
interface Tutor {
  _id: string;
  name: string;
  email: string;
  role: string;
  age: string;
  school: string;
  expertise: string | null;
  createdAt: string;
}

interface PaginationMeta {
  currentPage: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export default function TutorAdminPage() {
  // --- State Management ---
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [pagination, setPagination] = useState<PaginationMeta | null>(null);
  const [totalTeachers, setTotalTeachers] = useState<number>(0);
  
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  
  // Search state split for smooth debouncing
  const [searchInput, setSearchInput] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");
  
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // --- Search Debouncer (400ms) ---
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchInput);
      setPage(1); // Reset back to page 1 on fresh search terms
    }, 400);

    return () => clearTimeout(timer);
  }, [searchInput]);

  // --- Data Fetching ---
  useEffect(() => {
    const fetchTutors = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/users/tutors`);
        url.searchParams.append("page", page.toString());
        url.searchParams.append("limit", limit.toString());
        if (debouncedSearch) {
          url.searchParams.append("search", debouncedSearch);
        }

        const response = await fetch(url.toString());
        
        if (!response.ok) {
          throw new Error(`Failed to fetch tutors: ${response.statusText}`);
        }
        
        const jsonResponse = await response.json();
        
        setTutors(jsonResponse.data || []);
        setPagination(jsonResponse.pagination || null);
        setTotalTeachers(jsonResponse.totalTeachers || 0);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unexpected error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTutors();
  }, [page, limit, debouncedSearch]);

  // --- Navigation Handlers ---
  const handlePageChange = (newPage: number) => {
    if (pagination && newPage >= 1 && newPage <= pagination.totalPages) {
      setPage(newPage);
    }
  };

  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLimit(Number(e.target.value));
    setPage(1);
  };

  return (
    <div className="min-h-screen ">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section showcasing global metric */}
        <header className="mb-8 border-b border-[var(--color-brand-gray)]/20 pb-5">
          <h1 className="text-3xl font-extrabold tracking-tight text-[var(--color-brand-gold)]">
            Tutor Administration
          </h1>
          <p className="mt-2 text-sm text-[var(--color-brand-gray)]">
            Total Tutors Enrolled: <span className="text-[var(--color-brand-white)] font-bold">{totalTeachers}</span>
          </p>
        </header>

        {/* Filter Controls Bar */}
        <div className="mb-6 flex  flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
          
          {/* Search Bar Input */}
          <div className="relative  flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search tutors by name or email..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full px-4 py-2 text-sm bg-[var(--color-brand-dark)] text-[var(--color-brand-white)] border border-[var(--color-brand-gray)]/30 rounded-lg text-[var(--color-brand-white)] placeholder-[var(--color-brand-gray)]/60 focus:outline-none focus:border-[var(--color-brand-gold)] transition-colors"
            />
            {searchInput && (
              <button 
                onClick={() => setSearchInput("")}
                className="absolute right-3 top-2.5 text-xs  text-[var(--color-brand-gray)] hover:text-[var(--color-brand-white)]"
              >
                Clear
              </button>
            )}
          </div>

          {/* Limits Toggle Option */}
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <label htmlFor="limitSelector" className="text-xs text-[var(--color-brand-gray)] whitespace-nowrap">
              Show Items:
            </label>
            <select
              id="limitSelector"
              value={limit}
              onChange={handleLimitChange}
              className="bg-[var(--color-brand-dark)] text-[var(--color-brand-white)] border border-[var(--color-brand-gray)]/30 text-[var(--color-brand-white)] text-xs rounded-lg p-2 focus:outline-none focus:border-[var(--color-brand-gold)] cursor-pointer"
            >
              <option value="5">5 rows</option>
              <option value="10">10 rows</option>
              <option value="25">25 rows</option>
              <option value="50">50 rows</option>
            </select>
          </div>
        </div>

        {/* Async Render Lifecycles */}
        {error ? (
          <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-6 text-center text-red-500">
            <h2 className="text-xl font-bold mb-2">Fetch Error</h2>
            <p className="text-sm opacity-90">{error}</p>
          </div>
        ) : isLoading ? (
          <div className="flex py-24 items-center justify-center">
            <div className="animate-pulse text-lg font-medium text-[var(--color-brand-gray)]">
              Refreshing tutor directory dataset...
            </div>
          </div>
        ) : tutors.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-[var(--color-brand-gray)]/20 rounded-xl text-[var(--color-brand-gray)]">
            No tutor profiles found matching your search term.
          </div>
        ) : (
          <>
            {/* Semantic Data Table Grid */}
            <div className="overflow-x-auto rounded-t-xl border-x border-t border-[var(--color-brand-gray)]/20 bg-[var(--color-brand-dark)]  text-[var(--color-brand-white)] backdrop-blur-sm">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[var(--color-brand-gray)]/30 bg-[var(--color-brand-dark)] text-[var(--color-brand-white)] text-xs font-semibold uppercase tracking-wider text-[var(--color-brand-gold)]">
                    <th className="p-4">Name</th>
                    <th className="p-4">Email</th>
                    <th className="p-4">Institution / School</th>
                    <th className="p-4">Expertise Area</th>
                    <th className="p-4 text-center">Age</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--color-brand-gray)]/10 text-sm">
                  {tutors.map((tutor) => (
                    <tr 
                      key={tutor._id} 
                      className="hover:bg-[var(--color-brand-gray)]/5 transition-colors duration-150"
                    >
                      <td className="p-4 font-medium text-[var(--color-brand-white)]">
                        {tutor.name}
                      </td>
                      <td className="p-4 text-[var(--color-brand-gray)]">
                        {tutor.email}
                      </td>
                      <td className="p-4 text-[var(--color-brand-white)]/80">
                        {tutor.school || "N/A"}
                      </td>
                      <td className="p-4 text-xs">
                        {tutor.expertise ? (
                          <span className="px-2 py-1 rounded bg-[var(--color-brand-gold)]/10 text-[var(--color-brand-gold)] border border-[var(--color-brand-gold)]/20">
                            {tutor.expertise}
                          </span>
                        ) : (
                          <span className="text-[var(--color-brand-gray)] opacity-50">Generalist</span>
                        )}
                      </td>
                      <td className="p-4 text-center text-[var(--color-brand-gray)]">
                        {tutor.age}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Dashboard Footer Pagination Controls */}
            {pagination && (
              <div className="flex items-center  justify-between rounded-b-xl border border-[var(--color-brand-gray)]/20 bg-[var(--color-brand-dark)] text-[var(--color-brand-white)] p-4">
                <div className="text-xs text-[var(--color-brand-gray)]">
                  Showing <span className="text-[var(--color-brand-white)] font-medium">{tutors.length}</span> of{" "}
                  <span className="text-[var(--color-brand-white)] font-medium">{pagination.totalItems}</span> matching entries
                </div>
                
                <div className="flex  gap-2">
                  <button
                    onClick={() => handlePageChange(page - 1)}
                    disabled={!pagination.hasPrevPage || isLoading}
                    className="px-4 py-2 text-xs font-semibold rounded-md transition-all duration-150 border border-[var(--color-brand-gray)]/30 text-[var(--color-brand-white)] hover:bg-[var(--color-brand-gray)]/10 disabled:opacity-30 disabled:pointer-events-none"
                  >
                    Previous
                  </button>
                  
                  <button
                    onClick={() => handlePageChange(page + 1)}
                    disabled={!pagination.hasNextPage || isLoading}
                    className="px-4 py-2 text-xs font-semibold rounded-md transition-all duration-150 bg-[var(--color-brand-gold)] text-[var(--color-brand-dark)] hover:opacity-90 disabled:opacity-30 disabled:pointer-events-none"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        )}
        
      </div>
    </div>
  );
}