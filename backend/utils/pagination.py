from dto.main_dto import Pagination
from sqlalchemy import select, func
from math import ceil

def get_pagination(
    db, 
    main_stmt,
    limit,
    page
):
    with db: 
        stmt = select(func.count()).select_from(main_stmt.subquery())
        total_data = db.scalars(stmt).one()
        total_page = ceil(total_data / limit)
        
    return Pagination(
        total_data=total_data, 
        total_page=total_page,
        current_page=page,
        limit=limit
    )