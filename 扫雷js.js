
var ele_timer = document.getElementById("timer");           //计时器
var n_sec = 0; //秒
 
//60秒 === 1分
//60分 === 1小时
function timer() {
 return setInterval(function () {
 
 var str_sec = n_sec;
 
 if ( n_sec < 10) {
  str_sec = "0" + n_sec;
 }
 
 n_sec++;
 var time = "用时:"+ str_sec;
 ele_timer.value = time;
 
 
 
 }, 1000);
}
 



function chushixiange(grid,NumRows,NumCols){
    for (i=0 ; i < NumRows ;i++){
        for(j=0 ; j< NumCols ;j++){
            let kongNums= Math.trunc(Math.random()*NumRows*NumCols);
            let row=Math.trunc(kongNums/NumCols);
            let col=kongNums%NumCols
            console.log(kongNums,row,col);
            if (grid[row][col].leicount===0){
                searchClearArea(grid,row,col,NumRows,NumCols);
                return
            }


        }
    }



}


function shengyuleishu(grid,NumRows,NumCols){              //总雷数
    a=0;
    for (i=0 ; i < NumRows ;i++){
        for(j=0 ; j< NumCols ;j++){
            let yisilei=grid[i][j];
            
            if (yisilei.truelei){
                a+=1;
            }

        }
    }
    for (i=0 ; i < NumRows ;i++){
        for(j=0 ; j< NumCols ;j++){
            grid[i][j].shengyulei=a;
        }
    }

    console.log("a",a);
    return a;
}



function shengyulei(grid){
    let shengyuleicount=document.getElementById("shengyuleishu");
    let yulei=grid[i][j].shengyulei;
    shengyuleicount.innerText=("剩余雷数"+yulei);
    

}


function hasClass (ele, className) {
    var reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
    return reg.test(ele.className)
  }



function chushi(){
    
    let shuaxin=document.querySelector("#刷新");
    let tr=document.createElement("tr");
    let td=document.createElement("td");
    let Shuaxin=document.createElement("div");
    Shuaxin.classList.add("刷新div");
    
    Shuaxin.innerText=("初始化");                           //初始化按键
    td.append(Shuaxin);
    tr.append(td);
    shuaxin.append(tr);
    Shuaxin.addEventListener("click",(e)=>{
        
        
        location.reload();
    })
        
}





function nanduxuanzeEl(){

    
    



    let nanduxuanzeEl=document.querySelector("#nanduxuanze");
    let trEl=document.createElement("tr");
        
    let tdE1=document.createElement("td");
    let nandu1=document.createElement("div");
    nandu1.className=("难度");
    nandu1.innerText=("简单");
    tdE1.append(nandu1);

    let tdE2=document.createElement("td");
    let nandu2=document.createElement("div");
    nandu2.className=("难度");
    nandu2.innerText=("中级");
    tdE2.append(nandu2);

    let tdE3=document.createElement("td");
    let nandu3=document.createElement("div");                       //难度选择
    nandu3.className=("难度");
    nandu3.innerText=("高级");
    tdE3.append(nandu3);

    trEl.append(tdE1);
    trEl.append(tdE2);
    trEl.append(tdE3);
        
    nanduxuanzeEl.append(trEl);

    b=1;

    nandu1.addEventListener("click",(e)=>{        
        if(b)  {  
            var n_timer = timer();
            let grid=Chushihua(9,9,10);
            renderBoard(9,9,grid);
            chushixiange(grid,9,9);
            nandu1.className=("难度选中");
            b=0;
            console.log("a",b);
        }
            
            
    })

    nandu2.addEventListener("click",(e)=>{
        if(b)    {    
            var n_timer = timer();
            let grid=Chushihua(15,15,25);
            renderBoard(15,15,grid);
            chushixiange(grid,9,9);
            nandu2.className=("难度选中");
            b=0;
        }
    })

    nandu3.addEventListener("click",(e)=>{
        if(b) {
            var n_timer = timer();
            let grid=Chushihua(20,20,50);
            renderBoard(20,20,grid);
            chushixiange(grid,9,9);
            nandu3.className=("难度选中");
            b=0;
        }
    })
}





function renderBoard(NumRows,NumCols,grid){                               //行数，列数，初始化的棋盘
    
    let boardElement=document.querySelector("#board");//扫雷棋盘


    for (let i=0; i < NumRows; i++){                
        let trElement=document.createElement("tr"); 
        
        for (let j=0; j < NumCols; j++){
            let tdElement=document.createElement("td");         //生成表格
            
            let Gezi=document.createElement("div");             //通过给div元素赋予类名后使用css生成格子   
            Gezi.className=("Gezi");
            grid[i][j].Gezi=Gezi;
            //Gezi.innerText=grid[i][j].leicount;
            

            document.oncontextmenu=function(){return false;}        //禁用右键菜单
            let a=0
             
            Gezi.addEventListener("contextmenu",(e)=>{
                if ((a%2)===0 && !grid[i][j].clear  && grid[i][j].shengyulei !==0){
                    Gezi.classList.add("标识");                         //右键标识
                    grid[i][j].biaoshi=true;
                    a+=1;
                    addbiaocount(grid,i,j,NumRows,NumCols);                 //标识同时为周围格的标识数+1
                    
                    for (k=0 ; k < NumRows ;k++){                            //显示剩余雷-1
                        for(z=0 ; z< NumCols ;z++){
                            grid[k][z].shengyulei-=1;
                            console.log("剩余雷数",grid[k][z].shengyulei);

                        }
                    }

                }else if((a%2)===1 && !grid[i][j].clear && grid[i][j].shengyulei !==0){
                    Gezi.classList.remove("标识");                        //再次右键取消标识
                    grid[i][j].biaoshi=false;
                    a+=1;
                    removebiaocount(grid,i,j,NumRows,NumCols);                  //-1

                    for (k=0 ; k < NumRows ;k++){                                //显示1
                        for(z=0 ; z< NumCols ;z++){
                            grid[k][z].shengyulei+=1;
                            console.log("剩余雷数",grid[k][z].shengyulei);

                        }
                    }


                }
                shengyulei(grid);
            })
                
            
            
            shengyuleishu(grid,NumRows,NumCols);                                        //剩余雷数
            



            Gezi.addEventListener("click",(e)=> {
                                          //计时器
                shengyulei(grid);                                          //剩余雷数初始

                if (grid[i][j].leicount===-1){
                    explode(grid,i,j,NumRows,NumCols)
                    return;
                }

                if (grid[i][j].leicount===0){
                    searchClearArea(grid,i,j,NumRows,NumCols);                   //搜索当前点击点i,j周围的安全区域

                }else if(grid[i][j].leicount>0 && !grid[i][j].clear){
                    grid[i][j].clear=true;
                    Gezi.classList.add("clear");
                    grid[i][j].Gezi.innerText=grid[i][j].leicount;

                }else if (grid[i][j].leicount > 0 && grid[i][j].leicount===grid[i][j].biaocount){
                                                                                                        //判断；当标识真雷数与雷数相同时，运行
                                                                                                        //掀开周围非雷格函数
                    
                    explode1(grid,i,j,NumRows,NumCols);

                }
                
                checkAllClear(grid);

                
                //Gezi.classList.add("clear");
            
            
            });

            tdElement.append(Gezi);
            
            trElement.append(tdElement);                        //将生成的div元素装入td中，再将td 装入tr， 最后将tr装入棋盘中 
        }

        boardElement.append(trElement);
    }
    console.log("grid:",grid);
}
//扫雷棋盘主要部分

const directions=[
    [-1,-1],[-1,0],[-1,1],
    [ 0,-1],      [0, 1],
    [ 1,-1],[1,0],[1, 1],                                         //中心棋子一周的方向常量
]




function Chushihua(NumRows,NumCols,NumLei){
    
    let grid=new Array(NumRows);              //列表
    
    for (let i=0; i < NumRows; i++) {
        grid[i]=new Array(NumCols);
        
        for (let j=0; j < NumCols; j++){    //给每个格赋0
            grid[i][j]={
                clear:false,
                leicount:0,
                biaoshi:false,
                truelei:false,
                biaocount:0,
                shengyulei:0,

            }
        
        }
    
    }
    

    let Lei=[]
    for (let k=0; k < NumLei; k++){
        let LeiNums= Math.trunc(Math.random()*NumRows*NumCols);
        let row=Math.trunc(LeiNums/NumCols);
        let col=LeiNums%NumCols                 //生成[row,col]位置的雷
        
        console.log("zuobiao",LeiNums,row,col)
        grid[row][col].leicount= -1;
        Lei.push([row,col]);                    //给雷格赋-1，入栈

    }
    console.log("lei:",Lei)

    for (let [row,col] of Lei){
        a=row
        b=col                                    //真正的雷的标识
        grid[a][b].truelei=true;
    }

    for (let [row,col] of Lei){
        for (let [drow,dcol] of directions){
            let Gezirow=row + drow;
            let Gezicol=col + dcol;                             //雷格坐标
            
            if (Gezirow < 0 || Gezirow >= NumRows || Gezicol < 0 || Gezicol >= NumCols) {
                continue;                                               //跳出边框
            }
            
            
            if (grid[Gezirow][Gezicol].leicount===0){
                let leicount=0;
                for (let [arow,acol] of directions){
                    let NewGezirow=Gezirow+arow;
                    let NewGezicol=Gezicol+acol;                            //雷格一周依次的坐标
                    
                    if (NewGezirow < 0 || NewGezirow >= NumRows || NewGezicol < 0 || NewGezicol >= NumCols){
                        continue;                                            //跳出边框限制条件
                    }
                    
                    if (grid[NewGezirow][NewGezicol].leicount===-1){
                        leicount +=1;                                              //判断是否为雷 +1
                    }
                    //console.log("leicount:",leicount);
                }
                if (leicount > 0){
                    grid[Gezirow][Gezicol].leicount=leicount;                             //雷格周围的格一周的雷数
                }
            }
            
        }
           

    }




    return grid;

}

function addbiaocount(grid,row,col,NumRows,NumCols){
    
    for (let [drow,dcol] of directions){
        let Gezirow=row + drow;
        let Gezicol=col + dcol;
        if (Gezirow < 0 || Gezirow >= NumRows || Gezicol < 0 || Gezicol >= NumCols) {               //周围格标识+1
            continue;
            
        }
        let gridbiaocount=grid[Gezirow][Gezicol];
        gridbiaocount.biaocount+=1;
    }

}

function removebiaocount(grid,row,col,NumRows,NumCols){
    for (let [drow,dcol] of directions){
        let Gezirow=row + drow;
        let Gezicol=col + dcol;
        if (Gezirow < 0 || Gezirow >= NumRows || Gezicol < 0 || Gezicol >= NumCols) {                 //周围格标识-1
            continue;
            
        }
        let gridbiaocount=grid[Gezirow][Gezicol];
        gridbiaocount.biaocount-=1;
    }

}



function explode1(grid,row,col,NumRows,NumCols){
    let gridbiao=grid[row][col];
    for (let [drow,dcol] of directions){
        let Gezirow=row + drow;
        let Gezicol=col + dcol;
        if (Gezirow < 0 || Gezirow >= NumRows || Gezicol < 0 || Gezicol >= NumCols) {                         //掀开一圈非雷格并且标数
            continue;  
        }                                             //跳出边框
        let gridsearch=grid[Gezirow][Gezicol];
        gridsearch.clear=true;
        if (!gridsearch.truelei ){
            gridsearch.Gezi.classList.add("clear");
            
            
            if (gridsearch.leicount > 0 ){
                
                gridsearch.Gezi.innerText=gridsearch.leicount;               //??bug---有了判断不了胜利,没有展开后没有数字
            }
            
        }
    }
}




function checkAllClear(grid){
    for (let row=0; row < grid.length; row++){
        let gridrow=grid[row];
        for (let col=0; col < gridrow.length;col++ ){
            let gezi1=gridrow[col];
            if (gezi1.leicount !== -1 && !gezi1.clear  ){
                console.log([row,col],false);
                return false;
            }

        }
    }

    for (let row=0; row < grid.length; row++){
        let gridrow=grid[row];
        for (let col=0; col < gridrow.length;col++ ){
            let gezi1=gridrow[col];
            if (gezi1.leicount === -1 ){
                gezi1.Gezi.classList.add("雷");
            }
            gezi1.Gezi.classList.add("成功");

        }
    }
    alert("YOU WIN!");

    return true;
    
}


function searchClearArea(grid,row,col,NumRows,NumCols){
    let gridClera=grid[row][col];
    gridClera.clear=true;
    gridClera.Gezi.classList.add("clear");

    for (let [drow,dcol] of directions){
        let Gezirow=row + drow;
        let Gezicol=col + dcol;                             //搜索点周围一圈的坐标
            
        if (Gezirow < 0 || Gezirow >= NumRows || Gezicol < 0 || Gezicol >= NumCols) {
            continue;                                               //跳出边框
        }

        let gridClear=grid[Gezirow][Gezicol];                    //gridClear搜索点
        if(!gridClear.clear){
            gridClear.clear=true;
            gridClear.Gezi.classList.add("clear")

            if(grid[Gezirow][Gezicol].leicount===0){
                searchClearArea(grid,Gezirow,Gezicol,NumRows,NumCols);
            }else if (gridClear.leicount > 0){
                gridClear.Gezi.innerText = gridClear.leicount;
            }
        }
    }
}
    
function explode(grid,row,col,NumRows,NumCols){
    grid[row][col].Gezi.classList.add("explode");
    for (let Gezirow=0; Gezirow < NumRows ;Gezirow++){
        for (let Gezicol=0;Gezicol < NumCols ;Gezicol++){
            let Gezi=grid[Gezirow][Gezicol];
            Gezi.clear=true;
            Gezi.Gezi.classList.add("clear");

            if (Gezi.leicount===-1){
                Gezi.Gezi.classList.add("雷");
            }
        }
    }
    
    alert("YOU LOSE!!!");

}



nanduxuanzeEl();

chushi();