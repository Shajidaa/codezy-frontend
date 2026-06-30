"use client";

import React, { useEffect, useState, useCallback } from "react";

// --- Types & Interfaces ---
interface Student {
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

export default function StudentAdminPage() {
  // --- State Management ---
  const [students, setStudents] = useState<Student[]>([]);
  const [pagination, setPagination] = useState<PaginationMeta | null>(null);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  
  // Search States: Input captures typing immediately; debounced Search triggers the API call
  const [searchInput, setSearchInput] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");
  
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // --- Debouncer Logic ---
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchInput);
      setPage(1); // Reset to first page when search criteria changes
    }, 400); // 400ms delay window

    return () => clearTimeout(timer);
  }, [searchInput]);

  // --- Data Fetching ---
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Append both dynamic limit and search queries to the URL string
        const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/users/student`);
        url.searchParams.append("page", page.toString());
        url.searchParams.append("limit", limit.toString());
        if (debouncedSearch) {
          url.searchParams.append("search", debouncedSearch);
        }

        const response = await fetch(url.toString());
        
        if (!response.ok) {
          throw new Error(`Failed to fetch students: ${response.statusText}`);
        }
        
        const jsonResponse = await response.json();
        
        setStudents(jsonResponse.data || []);
        setPagination(jsonResponse.pagination || null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unexpected error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudents();
  }, [page, limit, debouncedSearch]); // Triggers automatically on any dependency matrix updates

  // --- Handlers ---
  const handlePageChange = (newPage: number) => {
    if (pagination && newPage >= 1 && newPage <= pagination.totalPages) {
      setPage(newPage);
    }
  };

  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLimit(Number(e.target.value));
    setPage(1); // Reset to page 1 whenever limit adjustments happen
  };

  return (
    <div className=" min-h-screen ">
      <div className="max-w-7xl mx-auto  ">
        
        {/* Header Section */}
        <header className="mb-8 border-b border-[var(--color-brand-gray)]/20 pb-5">
          <h1 className="text-3xl font-extrabold tracking-tight text-[var(--color-brand-gold)]">
           All Student Details
          </h1>
          <p className="mt-2 text-sm text-black">
            Manage your registered student profiles, check metadata controls, and handle filtered parameters.
          </p>
        </header>

        {/* Filter Controls Row */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
          
          {/* Search Box Control */}
          <div className="relative bg-[var(--color-brand-dark)] flex-1  max-w-md">
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full px-4 py-2 text-sm bg-black/30 border border-[var(--color-brand-gray)]/30 rounded-lg text-[var(--color-brand-white)] placeholder-[var(--color-brand-gray)]/60 focus:outline-none focus:border-[var(--color-brand-gold)] transition-colors"
            />
            {searchInput && (
              <button 
                onClick={() => setSearchInput("")}
                className="absolute right-3 top-2.5 text-xs text-[var(--color-brand-gray)] hover:text-[var(--color-brand-white)]"
              >
                Clear
              </button>
            )}
          </div>

          {/* Limit / Total Control */}
          <div className="flex items-center  gap-2 self-end sm:self-auto">
            <label htmlFor="limitSelector" className="text-xs text-black whitespace-nowrap">
              Show Items:
            </label>
            <select
              id="limitSelector"
              value={limit}
              onChange={handleLimitChange}
              className="bg-black/40 border border-[var(--color-brand-gray)]/30 text-[var(--color-brand-white)] text-xs rounded-lg p-2 focus:outline-none focus:border-[var(--color-brand-gold)] cursor-pointer"
            >
              <option value="5">5 records</option>
              <option value="10">10 records</option>
              <option value="25">25 records</option>
              <option value="50">50 records</option>
            </select>
          </div>

        </div>

        {/* Main Interface Content Handler */}
        {error ? (
          <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-6 text-center text-red-500">
            <h2 className="text-xl font-bold mb-2">System Error</h2>
            <p className="text-sm opacity-90">{error}</p>
          </div>
        ) : isLoading ? (
          <div className="flex py-24 items-center justify-center">
            <div className="animate-pulse text-lg font-medium text-[var(--color-brand-gray)]">
              Updating application dataset views...
            </div>
          </div>
        ) : students.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-[var(--color-brand-gray)]/20 rounded-xl text-[var(--color-brand-gray)]">
            No matching student records match your query metrics.
          </div>
        ) : (
          <>
            {/* Table Presentation Panel */}
            <div className="overflow-x-auto rounded-t-xl bg-[var(--color-brand-dark)] text-[var(--color-brand-white)] border-x border-t border-[var(--color-brand-gray)]/20  backdrop-blur-sm">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[var(--color-brand-gray)]/30 bg-black/20 text-xs font-semibold uppercase tracking-wider text-[var(--color-brand-gold)]">
                    <th className="p-4">Name</th>
                    <th className="p-4">Email</th>
                    <th className="p-4">School</th>
                    <th className="p-4 text-center">Age</th>
                    <th className="p-4">Joined Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--color-brand-gray)]/10 text-sm">
                  {students.map((student) => (
                    <tr 
                      key={student._id} 
                      className="hover:bg-[var(--color-brand-gray)]/5 transition-colors duration-150"
                    >
                      <td className="p-4 font-medium text-[var(--color-brand-white)]">
                        {student.name}
                      </td>
                      <td className="p-4 text-[var(--color-brand-gray)]">
                        {student.email}
                      </td>
                      <td className="p-4 text-[var(--color-brand-white)]/80">
                        {student.school || "N/A"}
                      </td>
                      <td className="p-4 text-center text-[var(--color-brand-gray)]">
                        {student.age}
                      </td>
                      <td className="p-4 text-xs text-[var(--color-brand-gray)]">
                        {new Date(student.createdAt).toLocaleDateString(undefined, {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Dashboard Footer */}
            {pagination && (
              <div className="flex items-center bg-[var(--color-brand-dark)] justify-between rounded-b-xl border border-[var(--color-brand-gray)]/20  p-4">
                <div className="text-xs text-[var(--color-brand-gray)]">
                  Showing matches <span className="text-[var(--color-brand-white)] font-medium">{students.length}</span> of{" "}
                  <span className="text-[var(--color-brand-white)] font-medium">{pagination.totalItems}</span> entries total
                </div>
                
                <div className="flex gap-2">
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