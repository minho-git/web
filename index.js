// index.js

const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

// CORS 처리를 위한 미들웨어 설정
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// Tottenham 일정을 가져오는 라우트 설정
app.get('/tottenham-fixtures', async (req, res) => {
    try {
        const response = await axios.get('https://api.football-data.org/v2/teams/73/matches', {
            headers: {
                'X-Auth-Token': 'd53e6da0044e42f4bc73fc74a19427d0', // 여기에 본인의 football.data.org API 키를 넣어주세요
            },
        });

        const fixtures = response.data.matches;
        res.json(fixtures);
    } catch (error) {
        console.error('Error fetching fixtures:', error);
        res.status(500).json({ error: '일정을 가져오는 데 실패했습니다' });
    }
});

// 서버 시작
app.listen(PORT, () => {
    console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다`);
});

async function fetchSquad() {
    const apiKey = 'YOUR_API_KEY_HERE'; // 여기에 API 키를 입력하세요
    const teamId = 'YOUR_TEAM_ID_HERE'; // 여기에 팀 ID를 입력하세요
    const apiUrl = `https://api.football-data.org/v2/teams/${teamId}`;

    try {
    const response = await fetch(apiUrl, {
        headers: { 'X-Auth-Token': apiKey }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch squad information');
    }

    const data = await response.json();
    displaySquad(data.squad);
    } catch (error) {
    console.error('Error fetching squad information:', error);
    }
}

  // 선수단 정보를 화면에 표시
function displaySquad(squad) {
    const squadList = document.getElementById('squadList');
    squadList.innerHTML = ''; // 기존 내용을 초기화

    squad.forEach(player => {
    const playerItem = document.createElement('div');
    playerItem.classList.add('player-item');
    playerItem.innerHTML = `
        <p>이름: ${player.name}</p>
        <p>포지션: ${player.position}</p>
        <p>국적: ${player.nationality}</p>
    `;
    squadList.appendChild(playerItem);
    });
}

fetchSquad();
;