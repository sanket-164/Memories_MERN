import React from 'react'
import { Link } from 'react-router-dom';
import { Pagination, PaginationItem } from '@material-ui/lab';

import useStyles from './styles';

export default function Paginate() {
  const classes = useStyles();
  return (
    <Pagination className={{ ul: classes.ul }} count={5} page={1} variant='outlined' color='primary' renderItem={(item) => {
      <PaginationItem {...item} component={Link} to={`/posts?page=${1}`} />
    }}>
    </Pagination>
  )
}
