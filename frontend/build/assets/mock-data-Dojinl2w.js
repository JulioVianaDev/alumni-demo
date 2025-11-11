import{c as n}from"./index-VY3BXTpr.js";/**
 * @license lucide-react v0.483.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const t=[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]],p=n("LoaderCircle",t);/**
 * @license lucide-react v0.483.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const c=[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2",key:"1w4ew1"}],["path",{d:"M7 11V7a5 5 0 0 1 10 0v4",key:"fwvmzm"}]],d=n("Lock",c),i=[{id:"1",name:"João Silva",email:"joao@alumni.pt",password:"123456",phone:"+351 912 345 678",isMember:!0,graduationYear:"2015",course:"Engenharia Informática",company:"TechCorp Portugal",position:"Senior Software Engineer"},{id:"2",name:"Maria Santos",email:"maria@alumni.pt",password:"123456",phone:"+351 913 456 789",isMember:!0,graduationYear:"2012",course:"Marketing",company:"Marketing Solutions Lda",position:"Marketing Director"},{id:"3",name:"Pedro Costa",email:"pedro@alumni.pt",password:"123456",phone:"+351 914 567 890",isMember:!1,graduationYear:"2018",course:"Gestão",company:"Startup XYZ",position:"Fundador"}],u=(o,e)=>{const a=i.find(r=>r.email===o&&r.password===e);if(a){const{password:r,...s}=a;return s}return null},l=o=>{const e={id:Date.now().toString(),name:o.name||"",email:o.email||"",password:o.password||"",phone:o.phone,isMember:!1,graduationYear:o.graduationYear,course:o.course,company:o.company,position:o.position};i.push(e);const{password:a,...r}=e;return r},w=(o=500)=>new Promise(e=>setTimeout(e,o));export{d as L,p as a,l as b,u as c,w as m};
