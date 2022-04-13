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
        var a = new Array(n);
        var b = new Array(n);
        let steps = ''
        for(i = 0; i < n; ++i) {
            a[i] = new Array(n);
        }

        let elem = 0
        for(i = 0; i < n; ++i) { //Заполнение матрицы
            for(j = 0; j < n; ++j) {
                a[i][j] = req.body.variables[elem++];
            }
        }

        for(i = 0; i < n; ++i) { //Заполнение матрицы
            b[i] = req.body.answers[i]
        }

        findAnswers()
        res.send({
            a,
            b,
            n, 
            steps
        })

        function findAnswers() {
            let eps=.000001;
            let max = 0;
            let max_i = 0;
            let  = 0, a_div_lead = 0;
            console.log(a)
            console.log(b)
            console.log(n)
            for(let k = 0; k < n; k++) {
                max=0;
                max_i=-1;
                for(let i = k; i < n; i++) {
                    if(Math.abs(a[i][k]) > max) {
                        max=Math.abs(a[i][k]);
                        max_i=i;
                    }
                }
                if(max_i==-1 || Math.abs(a[max_i][k])<eps)
                {
                    console.log("Error: det=0");
                    break;
                }
                lead=a[k][k];
                for(let j=k; j<n; j++)
                    a[k][j]/=lead;
                b[k]/=lead;
                for(i = 0; i < n; i++)
                {
                    a_div_lead=a[i][k]/a[k][k];
                    if(i!=k)
                    {
                    for(j=k; j < n; j++)
                        a[i][j]-=a[k][j]*a_div_lead;
                    b[i]-=b[k]*a_div_lead;
                    }
                }
                steps += `<h4>${k + 1} step</h4><table>`;
                for(i=0; i<n; ++i) {
                    steps += "<tr>";
                    for(j=0; j < n; ++j) {
                        steps += "<td>" + a[i][j] + "</td>";
                    }
                    steps += '<td id = "answ">' + b[i] + "</td>";

                    steps += "</tr>";
                }
                steps += "</table><br>";
            }
        }
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