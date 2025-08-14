function connect(platform) {
    const username = document.getElementById('username').value;
    if (!username.trim()) {
        alert('Por favor, insira seu nome de usuário antes de conectar.');
        return;
    }
    if (platform === 'Instagram') {
        const instaUrl = `https://www.instagram.com/oauth/authorize?enable_fb_login=0&force_authentication=1&client_id=1326353425175347&redirect_uri=https://n8n.witicket.com.br/webhook/c7fc72f9-db74-48f1-88fd-85082045d023&response_type=code&scope=instagram_business_basic%2Cinstagram_business_manage_messages%2Cinstagram_business_manage_comments%2Cinstagram_business_content_publish%2Cinstagram_business_manage_insights`;
        window.location.href = instaUrl;
    } else if (platform === 'TikTok') {
        const tiktokUrl = `https://www.tiktok.com/v2/auth/authorize/?scope=user.info.basic,video.list,video.publish,video.upload&redirect_uri=https://n8n.witicket.com.br/webhook/d8e26afa-a58b-4ad3-a8b5-849c753b109a&state=csrfState&response_type=code&client_key=sbawehj1o167o9ys86&client_id=ramon123&user_id=${encodeURIComponent(username)}`;
        window.location.href = tiktokUrl;
    } else {
        alert(`Tentando conectar ${username} com ${platform}`);
    }
}