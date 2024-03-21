'use client';

import { Grid } from "@radix-ui/themes";
import Landing from './Landing';

const Home = () => {
  
  return (
    <Grid columns={{ initial: '1', md:'2' }} gap='6'>
      <Landing />
    </Grid>
  )
}

export default Home;
