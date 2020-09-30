import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { Employee } from '../models/employemodel';

@Component({
  selector: 'app-empdetails',
  templateUrl: './empdetails.component.html',
  styleUrls: ['./empdetails.component.css']
})
export class EmpdetailsComponent implements OnInit {
  em: Employee;
  em2: string[] = [];
  toggleShow: boolean = false;
  @Output() empid: EventEmitter<string> = new EventEmitter();
  constructor(private emp: EmployeeService) {
    this.em = new Employee();
  }
  BtnSubmit(name, dob, addre, role, salary, experi) {
    this.em.ename = name;
    this.em.dob = dob;
    this.em.address = addre;
    this.em.role = role;
    this.em.salary = salary;
    this.em.experience = experi;
    this.emp.addemployeedetails(this.em).subscribe((data) => {
      alert('inserted successfully');
    });
  }

  BtnShow() {
    this.emp.employee().subscribe((data) => {
      this.em2 = data;

    });
  }

  Deletebtn(id){
    this.emp.deleteemployee(id).subscribe((data)=>{
      alert('deleted successfully')
      this.BtnShow();
    })
  }

  Btnchange(id) {
    alert('scrolldown please')
    this.empid.emit(id);

  }

  ngOnInit() {
  }

}
