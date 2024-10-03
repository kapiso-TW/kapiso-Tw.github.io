
    // 新的 SHA-256 雜湊值
    const oneTimeHash = "35906aeb79b257a9fa3e550999b8fa382f1b4b79f795f563d9e29199f067f8a8"; // '1030' 的雜湊值
    const reusableHash = "5e884898da28047151d0e56f8dc6292773603d0d6aabbddfb5fdf5d0547515c0"; // 'simple' 的雜湊值
    let isOneTimeUsed = false; // 記錄一次性密碼是否已使用過

    // 將輸入的密碼雜湊成 SHA-256，返回16進制的字串
    async function hashPassword(password) {
        const encoder = new TextEncoder();
        const data = encoder.encode(password);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    }

    async function unlock() {
        const passwordInput = document.getElementById("password").value;
        const errorMessage = document.getElementById("error-message");

        const hashedPassword = await hashPassword(passwordInput);

        // 調試：顯示密碼和生成的雜湊值
        alert("輸入的密碼: ", passwordInput);
        alert("生成的雜湊值: ", hashedPassword);

        if (hashedPassword === reusableHash) {
            document.getElementById("lock-screen").classList.remove("active");
            document.getElementById("content").classList.add("active");
        } else if (hashedPassword === oneTimeHash && !isOneTimeUsed) {
            isOneTimeUsed = true;
            document.getElementById("lock-screen").classList.remove("active");
            document.getElementById("content").classList.add("active");
        } else {
            errorMessage.style.display = "block";
        }
    }

