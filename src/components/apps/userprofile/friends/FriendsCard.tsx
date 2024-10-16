import {
  CardContent,
  Box,
  Stack,
  Avatar,
  Grid,
  Typography,
  Chip,
  TextField,
  InputAdornment,
  Divider,
  IconButton,
} from '@mui/material';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React, { useEffect } from 'react';
import BlankCard from '@/components/shared/BlankCard';
import { useSelector, useDispatch } from '@/store/Store';
import { fetchFollwores } from '@/store/apps/userProfile/UserProfileSlice';
import {
  IconBrandFacebook,
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandTwitter,
  IconSearch,
} from '@tabler/icons-react';
import { userType } from '@/types/apps/users';

interface socialType {
  name: string;
  icon: React.ReactElement;
}

const SocialIcons: socialType[] = [
  {
    name: 'Facebook',
    icon: <IconBrandFacebook size="18" color="#1877F2" />,
  },
  {
    name: 'Instagram',
    icon: <IconBrandInstagram size="18" color="#D7336D" />,
  },
  {
    name: 'Github',
    icon: <IconBrandGithub size="18" color="#006097" />,
  },
  {
    name: 'Twitter',
    icon: <IconBrandTwitter size="18" color="#1C9CEA" />,
  },
];

const FriendsCard = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchFollwores());
  }, [dispatch]);

  const filterFriends = (friends: userType[], cSearch: string) => {
    if (friends)
      return friends.filter(t =>
        t.name.toLocaleLowerCase().includes(cSearch.toLocaleLowerCase()),
      );

    return friends;
  };
  const [search, setSearch] = React.useState('');
  const getFriends = useSelector(state =>
    filterFriends(state.userpostsReducer.followers, search),
  );

  return (
    <>
      <Grid container spacing={3}>
        <Grid item sm={12} lg={12}>
          <Stack direction="row" alignItems={'center'} mt={2}>
            <Box>
              <Typography variant="h3">
                Friends &nbsp;
                <Chip
                  label={getFriends.length}
                  color="secondary"
                  size="small"
                />
              </Typography>
            </Box>
            <Box ml="auto">
              <TextField
                id="outlined-search"
                placeholder="Search Friends"
                size="small"
                type="search"
                variant="outlined"
                inputProps={{ 'aria-label': 'Search Followers' }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconSearch size="14" />
                    </InputAdornment>
                  ),
                }}
                fullWidth
                onChange={e => setSearch(e.target.value)}
              />
            </Box>
          </Stack>
        </Grid>
        {getFriends.map(profile => {
          return (
            <Grid item xs={12} lg={4} key={profile.id}>
              <BlankCard className="hoverCard">
                <CardContent>
                  <Stack direction={'column'} gap={2} alignItems="center">
                    <Avatar
                      alt="Remy Sharp"
                      src={profile.avatar}
                      sx={{ width: '80px', height: '80px' }}
                    />
                    <Box textAlign={'center'}>
                      <Typography variant="h5">{profile.name}</Typography>
                      <Typography variant="caption">{profile.role}</Typography>
                    </Box>
                  </Stack>
                </CardContent>
                <Divider />
                <Box
                  p={2}
                  py={1}
                  textAlign={'center'}
                  sx={{ backgroundColor: 'grey.100' }}
                >
                  {SocialIcons.map(sicon => {
                    return (
                      <IconButton key={sicon.name}>{sicon.icon}</IconButton>
                    );
                  })}
                </Box>
              </BlankCard>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default FriendsCard;
