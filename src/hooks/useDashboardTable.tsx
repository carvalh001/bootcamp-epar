
import { useState, useEffect } from 'react';
import { CalculatorSubmission } from '@/types/calculator';

export const useDashboardTable = (submissions: CalculatorSubmission[]) => {
  const [filteredSubmissions, setFilteredSubmissions] = useState<CalculatorSubmission[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  useEffect(() => {
    if (searchTerm) {
      const filtered = submissions.filter(submission => 
        (submission.contactInfo?.name && submission.contactInfo.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (submission.contactInfo?.email && submission.contactInfo.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (submission.inputs.city && submission.inputs.city.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (submission.inputs.state && submission.inputs.state.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setFilteredSubmissions(filtered);
      setCurrentPage(1);
    } else {
      setFilteredSubmissions(submissions);
    }
  }, [searchTerm, submissions]);
  
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredSubmissions.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredSubmissions.length / itemsPerPage);
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  const handlePageChange = (pageNumber: number) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return {
    currentItems,
    totalPages,
    currentPage,
    searchTerm,
    filteredSubmissions,
    handleSearchChange,
    handlePageChange
  };
};
