function ggggg(){
    console.log("ddd");
    const container = document.getElementById("container");
    const line = document.createElement("div");
    const length = Math.random() * 200 + 100; // 隨機長度 100px 到 300px
    const angle = Math.random() * 360; // 隨機角度 0 到 360 度
    const speed = Math.random() * 1000 + 500; // 隨機速度 500ms 到 1500ms

    // 設定線條的長度和角度
    line.classList.add("line");
    line.style.width = `${length}px`;
    line.style.transform = `rotate(${angle}deg)`;
    
    // 計算起始位置
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    line.style.left = `${centerX - length / 2}px`;
    line.style.top = `${centerY - 1}px`; // 讓線條的中心在畫面中

    container.appendChild(line);

    // 逐漸增快的動畫
    let startTime = null;

    function animateLine(timestamp) {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;

        // 增加移動的距離
        const distance = (elapsed / speed) * (1000 / (elapsed / speed));

        line.style.transform += `translateY(-${distance}px)`;

        if (distance < window.innerHeight) { // 當線條未完全移動出畫面
            requestAnimationFrame(animateLine);
        } else {
            line.remove(); // 移除已經離開視窗的線條
        }
    }

    requestAnimationFrame(animateLine);
    console.log("123");
}
