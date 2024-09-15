document.addEventListener('DOMContentLoaded', function () {
    // 添加元数据信息
    const metaInfo = [
        { key: 'Author', value: 'rickiey' },
        { key: 'Description', value: 'Decentralized docker hub on walrus.' },
    ];

    const metaInfoContainer = document.getElementById('meta-info');
    metaInfo.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.key}: ${item.value}`;
        metaInfoContainer.appendChild(listItem);
    });

    // 处理搜索按钮点击
    const searchButton = document.getElementById('search-button');
    searchButton.addEventListener('click', function () {
        const searchTerm = document.getElementById('search-input').value;
        if (searchTerm) {
            searchAPI(searchTerm);
        }
    });

    // 监听输入框的回车键事件
    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            const searchTerm = searchInput.value;
            if (searchTerm) {
                searchAPI(searchTerm);
            }
        }
    });
});

function searchAPI(query) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = 'Searching...';

    // 替换为真实的 API URL
    const apiUrl = `http://localhost:7700/indexes/images/search?q=${query}`;

    fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ztRNp4FS8YaoMsmRwzGy28Y97o9Ry10aJqk-NAvSpE0',
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            displayResults(data.hits);
        })
        .catch(error => {
            resultsContainer.innerHTML = 'Error fetching data';
            console.error('Error:', error);
        });
}

function displayResults(hits) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';  // 清空之前的结果

    if (hits.length === 0) {
        resultsContainer.innerHTML = 'No results found.';
        return;
    }

    // 遍历 hits 列表并创建块状展示方式
    hits.forEach(hit => {
        const card = document.createElement('div');
        card.classList.add('result-card');

        card.innerHTML = `
            <p><strong>ID txDigest:</strong> ${hit.id_tx_digest}</p>
            <p><strong>Image Tag:</strong> ${hit.image_tag}</p>
            <p><strong>Description:</strong> ${hit.desc}</p>
            <p><strong>Size (bytes):</strong> ${hit.size}</p>
            <p><strong>SHA256:</strong> ${hit.sha256}</p>
            <p><strong>blob-id:</strong> ${hit.blob_id}</p>
        `;
        resultsContainer.appendChild(card);
    });
}