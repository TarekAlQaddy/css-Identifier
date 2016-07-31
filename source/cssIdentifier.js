/**
 *  CSS IDENTIFIER v1.0
 */

(function(){
    "use strict";
    var a = document.createElement('div');
    //the HTML and inline CSS for the tool all as a string
    a.innerHTML = '<section class="toolBox right" style="font-size:15px;direction:ltr;outline:unset;box-sizing:content-box;position:fixed;top:0;right:50px;width:230px;background:#474747;z-index:9999999999;transition:all 0.5s;resize:horizontal"><a class="rightBtn" style="box-sizing:content-box;cursor:pointer;position:absolute;top:5px;right:10px;width:10px;height:15px;padding:3px;text-align:center;background:#18a2cf;"><div style="pointer-events:none;position:absolute;top:7px;width:5px;height:5px;border-bottom:1px solid #000;border-right:1px solid #000;transform:rotate(-45deg)"></div></a><a class="leftBtn" style="box-sizing:content-box;cursor:pointer;position:absolute;top:5px;left:10px;width:10px;height:15px;padding:3px;text-align:center;background:#18a2cf;"><div style="box-sizing:content-box;pointer-events:none;position:absolute;top:7px;left:6px;width:5px;height:5px;border-bottom:1px solid #000;border-left:1px solid #000;transform:rotate(45deg)"></div></a><input class="toolInput" type="text" style="direction:ltr;box-sizing:content-box;display:block;margin:10px auto;width:150px;height:27px;background:#313131;border:none;color:#9d9d9d;padding:3px;"><section class="toolBottom" style="text-align:left;box-sizing:content-box;width:100%;color:#b221b0;background:#313131;transition:all 0.5s;"><ul class="toolList" style="text-align:left;direction:ltr;box-sizing:content-box;margin:0"></ul></section></section>'
    document.body.insertBefore(a,document.body.firstChild);
    //making forEach method for NodeList
    NodeList.prototype.forEach = function(fn){
        for(var i = 0;i<this.length;i++){
            fn(this[i],i,this);
        }
    };
    var box = document.querySelector('.toolBox'),
        input = document.querySelector('.toolInput'),
        list = document.querySelector('.toolList'),
        inputValue='',
        arr = document.querySelectorAll('body *:not(script):not(.toolBox):not(.toolList):not(.toolInput):not(.toolBottom):not(.rightBtn):not(.leftBtn)'),
    //List that will have the actual Node of the website and the toolNode linked to each other, each pair with a unique number counting from 0.
        dynamicList = {
            top : 0,
            add : function(toolNode,realNode){
                this[this.top++] = [toolNode,realNode];
                //for memorizing the real background color of the real node "a closure".
                var BC = window.getComputedStyle(realNode).backgroundColor;
                toolNode.addEventListener('mouseover',function(){
                    realNode.style.backgroundColor = '#313131';
                });
                toolNode.addEventListener('mouseout',function(){
                    realNode.style.backgroundColor = BC;
                })
            },
            clear : function(){
                var x;
                for(x in this)
                    if(this[x] !== this.top && (typeof this[x] !== 'function')){
                        list.removeChild(this[x][0]);
                        delete this[x];
                    }
            }
        };
    //animation and movement of the tool
    document.querySelector('.rightBtn').onclick = function(){
        box.style.right = '50px';
        box.style.left ='';
    };
    document.querySelector('.leftBtn').onclick = function(){
        box.style.left = '50px';
        box.style.right = '';
    };
    box.addEventListener('mouseover',function(){
        this.style.opacity = 1;
    });
    box.addEventListener('mouseout',function(){
        this.style.opacity = 0.6;
    });
    function inputColor(){
        if(window.getComputedStyle(document.body)[inputValue] !== undefined)
            input.style.backgroundColor = '#39cc3c';
        else
            input.style.backgroundColor = '#b63666';
        setTimeout(function(){
            input.style.backgroundColor = '#313131'
        },400)
    }

    input.addEventListener('keypress',function(e){
        inputValue = this.value;
        if(e.keyCode === 13){
            inputColor();
            arr.forEach(function(v){v.removeEventListener('click',clickListener)});
            clearList();
            arr.forEach(function(v){
                v.addEventListener('click',clickListener);
            })
        }
    });

    function clearList(){
        dynamicList.clear();
    }
    function clickListener(){
        addLi(this);
    }
    function getProp(node,prop){
        return window.getComputedStyle(node)[prop];
    }
    //adding a toolNode for every element
    function addLi(node){
        var li = document.createElement('li');
        var span = document.createElement('span');
        span.style.color = '#d67443';
        span.innerHTML = node.nodeName.toLowerCase() + ': ';
        li.style.padding = '2px';
        li.appendChild(span);
        li.innerHTML += getProp(node,inputValue);
        list.appendChild(li);
        dynamicList.add(li,node);
    }
})();

