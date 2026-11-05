const tools=[
['percentage','Percentage Calculator','Calculate percentages, percentage change and find what percent one number is of another.','📊','Math'],
['tip','Tip Calculator','Split a restaurant bill and calculate a tip for each person.','🍽️','Everyday'],
['ratio','Ratio Calculator','Simplify a ratio and scale it up or down.','⚖️','Math'],
['proportion','Proportion Calculator','Solve a proportion using cross multiplication.','🧮','Math'],
['slope','Slope Calculator','Find the slope between two coordinate points.','📐','Math'],
['volume','Volume Calculator','Calculate volume of common 3D shapes.','📦','Math'],
['area','Area Calculator','Calculate area of rectangles, triangles and circles.','🔷','Math'],
['fraction','Fraction Calculator','Add, subtract, multiply or divide fractions.','🍰','Math'],
['age','Age Calculator','Calculate age in years, months and days from a birth date.','🎂','Date & Time'],
['date-difference','Date Difference Calculator','Find the number of days between two dates.','📅','Date & Time'],
['time-duration','Time Duration Calculator','Calculate elapsed time between two clock times.','⏱️','Date & Time'],
['hours','Hours and Minutes Calculator','Add or subtract hours and minutes.','🕒','Work'],
['gpa','GPA Calculator','Calculate a simple GPA from course grades and credits.','🎓','Education'],
['grade','Grade Calculator','Calculate your current grade from points earned and possible.','📝','Education'],
['final-grade','Final Exam Grade Calculator','Find the exam score needed to reach your target course grade.','🎯','Education'],
['weighted-grade','Weighted Grade Calculator','Calculate a weighted average from category scores.','📚','Education'],
['average','Average Calculator','Find the mean, median and range of a set of numbers.','📈','Math'],
['discount','Discount Calculator','Calculate sale price and savings after a discount.','🏷️','Money'],
['salary','Salary Calculator','Convert salary between annual, monthly, weekly and hourly pay.','💼','Work'],
['compound-interest','Compound Interest Calculator','Estimate how savings grow with compound interest and regular deposits.','💰','Money']
];
const $=s=>document.querySelector(s);
function slug(){return document.body.dataset.tool||''}
function toolUrl(id){return 'tools/'+id+'/'}
function renderHome(){let root=$('#tools');if(!root)return;root.innerHTML=tools.map(t=>'<a class="tool-card" href="'+toolUrl(t[0])+'"><div class="tool-icon">'+t[3]+'</div><h3>'+t[1]+'</h3><p>'+t[2]+'</p></a>').join('');let search=$('#search');search?.addEventListener('input',()=>{let q=search.value.toLowerCase();root.innerHTML=tools.filter(t=>t.join(' ').toLowerCase().includes(q)).map(t=>'<a class="tool-card" href="'+toolUrl(t[0])+'"><div class="tool-icon">'+t[3]+'</div><h3>'+t[1]+'</h3><p>'+t[2]+'</p></a>').join('')||'<p>No calculators found. Try another search.</p>'});$('#year').textContent=new Date().getFullYear()}
const n=id=>Number(document.getElementById(id)?.value||0),v=id=>document.getElementById(id)?.value;
function output(value,detail=''){let r=$('#result');r.classList.add('show');$('#answer').textContent=value;$('#detail').textContent=detail}
function fmt(x,d=4){return Number.isFinite(x)?Number(x.toFixed(d)).toLocaleString(undefined,{maximumFractionDigits:d}):'Check your inputs'}
function calculate(){let id=slug(),a,b,c,d,res,detail='';switch(id){
case'percentage':a=n('a');b=n('b');res=$('#mode').value==='of'?a*b/100:$('#mode').value==='is'?(b?100*a/b:NaN):(b?(a-b)/b*100:NaN);detail=$('#mode').value==='of'?fmt(a)+'% of '+fmt(b):$('#mode').value==='is'?fmt(a)+' is '+fmt(res)+'% of '+fmt(b):'Percentage change from '+fmt(b)+' to '+fmt(a);break;
case'tip':a=n('a');b=n('b');c=Math.max(1,n('c'));res=a*b/100;detail='Tip: '+fmt(res,2)+' · Total: '+fmt(a+res,2)+' · Per person: '+fmt((a+res)/c,2);res=fmt((a+res)/c,2)+' per person';break;
case'ratio':a=n('a');b=n('b');let gcd=(x,y)=>y?gcd(y,x%y):Math.abs(x);let g=gcd(a,b);res=g?fmt(a/g,0)+' : '+fmt(b/g,0):'0 : 0';detail='Simplified ratio';break;
case'proportion':a=n('a');b=n('b');c=n('c');res=a?fmt(b*c/a):'Cannot divide by zero';detail='If a : b = c : x, then x = (b × c) ÷ a.';break;
case'slope':a=n('a');b=n('b');c=n('c');d=n('d');res=(d-b)!==0?fmt((d-b)/(c-a)):(c-a)===0?'Undefined (same point)':'Undefined (vertical line)';detail='Slope = (y₂ − y₁) ÷ (x₂ − x₁).';break;
case'volume':a=n('a');b=n('b');c=n('c');res=$('#shape').value==='sphere'?(4/3*Math.PI*a**3):$('#shape').value==='cylinder'?Math.PI*a*a*b:a*b*c;detail='Cubic units. Sphere uses radius; cylinder uses radius and height; box uses length, width and height.';break;
case'area':a=n('a');b=n('b');res=$('#shape').value==='circle'?Math.PI*a*a:$('#shape').value==='triangle'?a*b/2:a*b;detail='Square units.';break;
case'fraction':a=n('a');b=n('b');c=n('c');d=n('d');if(!b||!d){res='Denominator cannot be zero';break}let op=$('#op').value,top=op==='+'?a*d+c*b:op==='-'?a*d-c*b:op==='×'?a*c:a*d,bot=op==='+'||op==='-'?b*d:op==='×'?b*d:b*c;let gg=gcd(top,bot);res=fmt(top/gg,0)+' / '+fmt(bot/gg,0);detail='Exact fraction, simplified.';break;
case'age':let born=new Date(v('date')+'T00:00:00'),today=new Date(v('asof')+'T00:00:00');if(!v('date')||born>today){res='Enter a valid birth date';break}let years=today.getFullYear()-born.getFullYear(),months=today.getMonth()-born.getMonth(),days=today.getDate()-born.getDate();if(days<0){months--;days+=new Date(today.getFullYear(),today.getMonth(),0).getDate()}if(months<0){years--;months+=12}res=years+' years, '+months+' months, '+days+' days';detail='Age on '+today.toLocaleDateString();break;
case'date-difference':let dt1=new Date(v('date1')+'T00:00:00'),dt2=new Date(v('date2')+'T00:00:00');res=Math.round(Math.abs(dt2-dt1)/86400000).toLocaleString()+' days';detail='Absolute difference between the selected dates.';break;
case'time-duration':let t1=v('t1').split(':').map(Number),t2=v('t2').split(':').map(Number);let mins=t2[0]*60+t2[1]-(t1[0]*60+t1[1]);if(mins<0)mins+=1440;res=Math.floor(mins/60)+' hours '+mins%60+' minutes';detail='If the end time is earlier, it is treated as the following day.';break;
case'hours':a=n('h1')*60+n('m1');b=n('h2')*60+n('m2');let total=$('#op').value==='add'?a+b:a-b;res=(total<0?'-':'')+Math.floor(Math.abs(total)/60)+' hours '+Math.abs(total)%60+' minutes';detail='Combined duration.';break;
case'gpa':let rows=[...document.querySelectorAll('.course')];let pts=0,credits=0;rows.forEach(row=>{let cr=Number(row.querySelector('.credit').value),gr=Number(row.querySelector('.grade').value);pts+=cr*gr;credits+=cr});res=credits?fmt(pts/credits,2):'Enter course credits';detail='Weighted by course credits. Uses the grade-point values you enter; grading scales vary by institution.';break;
case'grade':a=n('a');b=n('b');res=b?fmt(a/b*100,2)+'%':'Enter possible points';detail=fmt(a)+' points earned out of '+fmt(b)+'.';break;
case'final-grade':a=n('a');b=n('b');c=n('c');d=n('d');res=(1-b/100)>0?fmt((c-a*b/100)/(1-b/100),2)+'%':'Final exam weight must be below 100%';detail='Required final exam score to reach your target overall grade.';break;
case'weighted-grade':let cats=[...document.querySelectorAll('.weight-row')],sum=0,w=0;cats.forEach(row=>{let score=Number(row.querySelector('.score').value),weight=Number(row.querySelector('.weight').value);sum+=score*weight;w+=weight});res=w?fmt(sum/w,2)+'%':'Enter category weights';detail='Weights are normalized to their total. Ideally, category weights should add to 100%.';break;
case'average':let nums=v('nums').split(/[ ,;]+/).map(Number).filter(x=>Number.isFinite(x));if(!nums.length){res='Enter numbers separated by commas';break}let sorted=[...nums].sort((x,y)=>x-y);res='Mean: '+fmt(nums.reduce((x,y)=>x+y,0)/nums.length);detail='Median: '+fmt(sorted.length%2?sorted[(sorted.length-1)/2]:(sorted[sorted.length/2-1]+sorted[sorted.length/2])/2)+' · Range: '+fmt(sorted.at(-1)-sorted[0])+' · Count: '+nums.length;break;
case'discount':a=n('a');b=n('b');res=fmt(a*(1-b/100),2);detail='You save '+fmt(a*b/100,2)+' ('+fmt(b)+'% discount).';break;
case'salary':a=n('a');let periods={annual:1,monthly:12,weekly:52,hourly:2080},from=$('#from').value,annual=a*periods[from];res='Annual: '+fmt(annual,2);detail='Monthly: '+fmt(annual/12,2)+' · Weekly: '+fmt(annual/52,2)+' · Hourly: '+fmt(annual/2080,2)+' (assumes 40 hours/week, 52 weeks/year).';break;
case'compound-interest':a=n('a');b=n('b')/100;c=n('c');d=n('d');let freq=n('freq')||12,rate=b/freq,periods2=c*freq;let fv=a*Math.pow(1+rate,periods2)+(rate?d*(Math.pow(1+rate,periods2)-1)/rate:d*periods2);res=fmt(fv,2);detail='Estimated future value. Contributions assumed at the end of each compounding period; excludes taxes, fees and inflation.';break;
}output(String(res),detail)}
function fields(id){let f=(label,id,type='number',val='0',step='any')=>'<div class="field"><label for="'+id+'">'+label+'</label><input id="'+id+'" type="'+type+'" value="'+val+'" '+(type==='number'?'step="'+step+'"':'')+'></div>';let select=(label,id,opts)=>'<div class="field"><label for="'+id+'">'+label+'</label><select id="'+id+'">'+opts.map(x=>'<option value="'+x[0]+'">'+x[1]+'</option>').join('')+'</select></div>';let date=(id)=>f(id==='date'?'Date of birth':id==='asof'?'Calculate age on':id==='date1'?'Start date':'End date',id,'date',new Date().toISOString().slice(0,10));switch(id){
case'percentage':return f('First number / percentage','a')+f('Second number / whole','b')+select('Calculation','mode',[['of','What is X% of Y?'],['is','X is what percent of Y?'],['change','Percentage change from Y to X']]);
case'tip':return f('Bill amount','a')+f('Tip percentage (%)','b','number','15')+f('Number of people','c','number','1');
case'ratio':return f('First value','a')+f('Second value','b');
case'proportion':return f('A','a')+f('B','b')+f('C','c');
case'slope':return f('X₁','a')+f('Y₁','b')+f('X₂','c')+f('Y₂','d');
case'volume':return select('Shape','shape',[['box','Rectangular box'],['cylinder','Cylinder'],['sphere','Sphere']])+f('Length / radius','a')+f('Width / height','b')+f('Height (box only)','c');
case'area':return select('Shape','shape',[['rectangle','Rectangle'],['triangle','Triangle'],['circle','Circle']])+f('Length / base / radius','a')+f('Width / height (not used for circle)','b');
case'fraction':return f('Numerator 1','a')+f('Denominator 1','b')+select('Operation','op',[['+','Add (+)'],['-','Subtract (−)'],['×','Multiply (×)'],['÷','Divide (÷)']])+f('Numerator 2','c')+f('Denominator 2','d');
case'age':return date('date')+date('asof');
case'date-difference':return date('date1')+date('date2');
case'time-duration':return f('Start time','t1','time','09:00')+f('End time','t2','time','17:00');
case'hours':return f('First hours','h1')+f('First minutes','m1')+f('Second hours','h2')+f('Second minutes','m2')+select('Operation','op',[['add','Add durations'],['subtract','Subtract second from first']]);
case'gpa':return '<div id="courses">'+courseRow()+courseRow()+courseRow()+'</div><button class="btn alt" type="button" id="add-course">+ Add course</button><p class="notice">Enter grade points using your institution’s scale (for example, 4.0 scale) and course credits.</p>';
case'grade':return f('Points earned','a')+f('Total possible points','b');
case'final-grade':return f('Current grade (%)','a')+f('Current grade weight (%)','b','number','80')+f('Target overall grade (%)','c','number','90')+f('Final exam weight (%)','d','number','20');
case'weighted-grade':return '<div id="weights">'+weightRow()+weightRow()+weightRow()+'</div><button class="btn alt" type="button" id="add-weight">+ Add category</button>';
case'average':return '<div class="field"><label for="nums">Numbers (separate with commas or spaces)</label><input id="nums" value="12, 15, 18, 20"></div>';
case'discount':return f('Original price','a')+f('Discount (%)','b','number','20');
case'salary':return f('Pay amount','a')+select('Current pay period','from',[['annual','Annual'],['monthly','Monthly'],['weekly','Weekly'],['hourly','Hourly']]);
case'compound-interest':return f('Initial deposit','a')+f('Annual interest rate (%)','b','number','5')+f('Years','c','number','10')+f('Regular deposit each period','d','number','100')+select('Compounding frequency','freq',[['12','Monthly'],['4','Quarterly'],['1','Annually']]);
}return ''}
function courseRow(){return '<div class="fields course" style="margin:10px 0"><div class="field"><label>Credits</label><input class="credit" type="number" min="0" step="any" value="3"></div><div class="field"><label>Grade points</label><input class="grade" type="number" min="0" step="any" value="4"></div></div>'}
function weightRow(){return '<div class="fields weight-row" style="margin:10px 0"><div class="field"><label>Score (%)</label><input class="score" type="number" value="85"></div><div class="field"><label>Weight (%)</label><input class="weight" type="number" value="30"></div></div>'}
function renderTool(){let id=slug(),t=tools.find(x=>x[0]===id);if(!t)return;$('#tool-title').textContent=t[1];$('#tool-lead').textContent=t[2];$('#tool-icon').textContent=t[3];$('#fields').innerHTML=fields(id);$('#calculate').addEventListener('click',calculate);$('#reset').addEventListener('click',()=>location.reload());$('#add-course')?.addEventListener('click',()=>$('#courses').insertAdjacentHTML('beforeend',courseRow()));$('#add-weight')?.addEventListener('click',()=>$('#weights').insertAdjacentHTML('beforeend',weightRow()));let rel=tools.filter(x=>x[0]!==id&&x[4]===t[4]).slice(0,5);$('#related').innerHTML=rel.map(x=>'<a href="../'+x[0]+'/">'+x[1]+'</a>').join('');$('#year').textContent=new Date().getFullYear()}
if($('#tools'))renderHome();if(document.body.dataset.tool)renderTool();