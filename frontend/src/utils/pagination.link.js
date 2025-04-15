export function nextPageUrl(base, currentPage, totalPage) {
   let url = "";
   let valid = false;

   if (isNaN(currentPage) || typeof currentPage !== "number")
      url = `${base}?page=${currentPage}`;
   else if (currentPage + 1 > totalPage)
      url = `${base}?page=${currentPage}`;
   else (url = `${base}?page=${currentPage + 1}`), (valid = true);

   return function limitUrl(limit) {
      if (isNaN(limit) || typeof limit !== "number")
         return { url: `${url}&limit=15`, valid };

      return { url: `${url}&limit=${limit}`, valid };
   };
}

export function prevPageUrl(base, currentPage, totalPage) {
   let url = "";
   let valid = false;

   if (isNaN(currentPage) || typeof currentPage !== "number")
      url = `${base}?page=${currentPage}`;
   else if (currentPage - 1 > totalPage || currentPage - 1 < 1)
      url = `${base}?page=${currentPage}`;
   else (url = `${base}?page=${currentPage - 1}`), (valid = true);

   return function limitUrl(limit) {
      if (isNaN(limit) || typeof limit !== "number")
         return { url: `${url}&limit=15`, valid };

      return { url: `${url}&limit=${limit}`, valid };
   };
}

export function paginationUrl(base, currentPage, page) {}
