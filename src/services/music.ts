import { axios } from "./instance";

type FavoriteMusicRequestParams = {
  userId: string;
  musicId: string;
};

type SearchMusicParams = {
  songName: string;
  artistName: string;
};

type SearchMusicResponse = {
  artist: string;
  id: string;
  lyrics: string;
  title: string;
};

export async function favoriteMusicRequest(params: FavoriteMusicRequestParams) {
  const response = await axios.post(`/playlists/${params.userId}/${params.musicId}`, {
    ...params,
  });

  return {
    data: response.data,
    status: response.status,
  };
}

export async function unfavoriteMusicRequest(params: FavoriteMusicRequestParams) {
  const response = await axios.delete(`/playlists/${params.userId}/${params.musicId}`);

  return {
    data: response.data,
    status: response.status,
  };
}

export async function getFavoritesRequest(userId: string) {
  const response = await axios.get(`/playlists/${userId}/all`);

  return {
    data: response.data,
    status: response.status,
  };
}

export async function searchMusic(params: SearchMusicParams) {
  const response = await axios.get("/musics", {
    params: {
      ...params,
    },
  });

  return {
    data: response.data as SearchMusicResponse,
    status: response.status,
  };
}

export async function searchMusicById(id: string) {
  const response = await axios.get(`/musica/${id}`);

  return {
    data: response.data,
    status: response.status,
  };
}