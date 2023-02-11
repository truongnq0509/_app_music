const routes = {
    home: '/',
    search: 'tim-kiem',
    album: 'album/:title/:id',
    artist: ':name',
    mv: 'the-loai-video',
    video: 'video-clip/:title/:id',
    login: 'login',
    register: 'register',
    myMusic: 'mymusic',
    notFound: '/*',
    profile: ':nickname',
    radio: 'radio',
}

export default routes
