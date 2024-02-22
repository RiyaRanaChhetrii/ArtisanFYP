import React from 'react'
import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

// Dynamically generating page link 
// Functional component for pagination
const Paginate = ({ pages, page, isAdmin = false, keyword = '' }) => {
  return (
    // Display pagination only if there are more than one page
    pages > 1 && (
      // Bootstrap Pagination component
      <Pagination>
         {/* Generate pagination items based on the number of pages */}
        {[...Array(pages).keys()].map((x) => (
          <LinkContainer
            key={x + 1}
            to={
              !isAdmin
                ? keyword
                  ? `/search/${keyword}/page/${x + 1}`
                  : `/page/${x + 1}`
                : `/admin/productlist/${x + 1}`
            }
          >
            {/* Pagination.Item represents each page number */}
            <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
          </LinkContainer>
        ))}
      </Pagination>
    )
  )
}

export default Paginate
