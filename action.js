let cpu = 0;
let player = 0;
let isBatting = true;
let bowls = [0,1,2,3,4,6];
let target = 0;
let innings = 1;

let toss = Math.floor(Math.random() * 2);
if(toss == 0){
    isBatting = true;
    $(".current-player").text("PLAYER");
}else{
    isBatting = false;
    $(".current-player").text("CPU");
}
$(".target-area").addClass("hide-target");

$(".clicking-balls").on("click",(event)=>{
    let current_score = event.target.innerText;
    if(isBatting){
        $(".current-player").text("PLAYER");
        $(".batting-person").text("YOU BATTING");
        $(".bowling-person").text("CPU BOWLING");
        $(".ball-hit").addClass("player-style");
        $(".ball-throw").removeClass("player-style");
        let current_bowl = bowls[Math.floor(Math.random() * 6)];
        $(".bowling-hit").text(current_bowl);
        $(".batting-hit").text(current_score);
        if(current_bowl == current_score && innings == 1){
            isBatting = false;
            $(".batting-total-score").text("0");
            target = player+1;
            player = 0;
            //resetting colors
            
            //
            innings = 2;
            $(".target-area").removeClass("hide-target");
            $(".total-target-count").text(target+"");
            $(".total-target-remaining").text(target+"")
            //bowled
            $(".current-player").text("Now CPU's Turn");
            
        }
        else if(current_bowl == current_score && innings == 2 && player+parseInt(current_score) < target){
            $(".total-target-remaining").text(target-player-player+parseInt(current_score));
            console.log("cpu won");
            displayResult("lost");
        }
        else if(current_bowl == current_score && innings == 2 && player+parseInt(current_score) == target){
            $(".total-target-remaining").text(target-player-player+parseInt(current_score));
            console.log("Draw match");
            displayResult("draw");
        }
        else if(player+parseInt(current_score) > target && innings === 2){
            $(".total-target-remaining").text("0");
            $(".batting-total-score").text(player+parseInt(current_score))
            console.log("Player won");
            displayResult("won");
        }
        else{
            player = player+ parseInt(current_score);
            $(".batting-total-score").text(player)
            $(".total-target-remaining").text(target-player);
        }

    }else{
        //cpu batting
        $(".current-player").text("CPU");
        $(".batting-person").text("CPU BATTING");
        $(".bowling-person").text("YOU BOWLING");
        $(".ball-throw").addClass("player-style");
        $(".ball-hit").removeClass("player-style");
        let current_opposite_bat = bowls[Math.floor(Math.random() * 6)];
        $(".batting-hit").text(current_opposite_bat);
        $(".bowling-hit").text(current_score);
        if(current_opposite_bat == current_score && innings == 1){
            isBatting = true;
            $(".batting-total-score").text("0");
            target = cpu+1;
            cpu = 0;
            //resetting colors

            //
            innings = 2;
            $(".target-area").removeClass("hide-target");
            $(".total-target-count").text(target+"");
            $(".total-target-remaining").text(target+"")
            //bowled
            $(".current-player").text("Now PLAYER's Turn");
            
        }
        else if(current_opposite_bat == current_score && cpu+current_opposite_bat < target &&innings == 2){
            $(".total-target-remaining").text(target-cpu-current_opposite_bat);
            console.log("Player won");
            displayResult("won");
        }
        else if(current_opposite_bat == current_score && cpu+current_opposite_bat == target &&innings == 2){
            $(".total-target-remaining").text(target-cpu-current_opposite_bat);
            console.log("Draw Match");
            displayResult("draw");
        }        
        else if(cpu+current_opposite_bat > target && innings === 2){
            $(".total-target-remaining").text("0");
            $(".batting-total-score").text(cpu+current_opposite_bat);
            console.log("cpu won");
            displayResult("lost");
        }else{
            cpu = cpu + current_opposite_bat;
            $(".batting-total-score").text(cpu);
            $(".total-target-remaining").text(target-cpu);
        }
    }
    
})

let displayResult= (status)=>{
    if(status==="draw"){
        $(".result-heading").text("HAHAHA DRAW MATCH !!");
    }else if(status==="won"){
        $(".result-heading").text("YAY YOU WON !!");
    }else{
        $(".result-heading").text("OOPS YOU LOST !!");
    }
    $(".final-result").css("display","block");
    $(".result-score").text(target);
}

$(".close-button").on("click", (e)=>{
    location.reload();
    return false;
})
