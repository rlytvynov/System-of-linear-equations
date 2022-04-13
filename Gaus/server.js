const express = require('express')
const server = express()
const path = require('path')

const HOST = 'localhost'
const PORT = 3000

server.use(express.json());

server.get('/', (req, res) => {
    res.sendFile(path.resolve('index.html'))
})
server.post('/', (req, res) => {
    if(req.body.row && req.body.col) {
        if(req.body.row !== req.body.col) {
            console.error("Raws shoul be equal to columns")
            res.redirect('/')
        } else {
            const {row, col} = req.body
            res.send({
                row,
                col
            })
        }
    } else {
        var n = req.body.row
        var m = new Array(n);
        var l = new Array(n);
        let steps = ''
        for(i = 0; i < n; ++i) {
            m[i] = new Array(n);
            l[i] = new Array(n);
        }
        let elem = 0
        for(i = 0; i < n; ++i) { //Заполнение матрицы
            for(j = 0; j <= n; ++j) {
                m[i][j] = req.body.arr[elem++];
            }
        }
        Iteration(n);
        Answers();

        const arr = l
        res.send({
            arr, 
            steps
        })
        function Iteration(iter_item) { //Itteration function
            for(iter_item=0;iter_item<(n-1);iter_item++) { //Main cycle
                if (m[iter_item][iter_item] == 0) SwapRows(iter_item); //Check on zero
                for(j=n; j>=iter_item; j--) {
                    m[iter_item][j] /= m[iter_item][iter_item]; //Divide string iter_item on а[i][i]
                }
                for(i=iter_item+1; i<n; i++) { //Executing operations on the strings
                    for(j=n;j>=iter_item;j--) {
                        m[i][j] -= m[iter_item][j] * m[i][iter_item];
                    }
                };
                steps += `<h4>${iter_item + 1} step</h4><table>`;
                for(i=0; i<n; ++i) {
                    steps += "<tr>";
                    for(j=0; j <= n; ++j) {
                        if(n-j === 0) {
                            steps += '<td id = "results_td">' + m[i][j] + "</td>";
                        } else {
                            steps += "<td>" + m[i][j] + "</td>";
                        }
                    }
                    steps += "</tr>";
                }
                steps += "</table><br>";
            }
        };
        
        function SwapRows(iter_item) { //Функция перемены строк
            let k = 0
            for(i=iter_item+1;i<n;i++) {
                if(m[i][iter_item] !== 0) {
                    for(j=0;j<=n;j++) {
                        k = m[i-1][j];
                        m[i-1][j] = m[i][j];
                        m[i][j] = k;
                    }
                } 
            }
        };
        
        function Answers() { //Функция поиска и вывода корней
            l[n-1] = m[n-1][n]/m[n-1][n-1];
            for(i=n-2;i>=0;i--) {
                k=0;
                for(j=n-1;j>i;j--) {
                    k = (m[i][j]*l[j]) + k;
                }
                l[i] = m[i][n] - k;
            }
        };
    }
})


server.listen(PORT, () => {
    console.log(`Server running on http://${HOST}:${PORT}`)
})












/*<h1>Gaus method</h1>
<table>
    <tr>
        <td><input type="text"> + </td>
        <td><input type="text"> + </td>
        <td><input type="text"> = </td>
        <td><input type="text"></td>
    </tr>
    <tr>
        <td><input type="text"> + </td>
        <td><input type="text"> + </td>
        <td><input type="text"> = </td>
        <td><input type="text"></td>
    </tr>
    <tr>
        <td><input type="text"> + </td>
        <td><input type="text"> + </td>
        <td><input type="text"> = </td>
        <td><input type="text"></td>
    </tr>
</table>*/