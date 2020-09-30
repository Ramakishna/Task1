import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { Employee } from '../models/employemodel';

@Component({
  selector: 'app-updatedetails',
  templateUrl: './updatedetails.component.html',
  styleUrls: ['./updatedetails.component.css']
})
export class UpdatedetailsComponent implements OnInit {
  em: Employee;
  em2: string[] = [];
  flag: Boolean = false;
  constructor(private ser: EmployeeService) { }
  btnChange(event) {
    this.getbyId(event);

  }
  getbyId(id) {
    this.ser.getdetailsbyid(id).subscribe((data) => {
      this.flag = true;
      this.em = data[0];
    });
  }
  subclick(ename, dob, address, role, salary, experience) {
    this.em.ename = ename.value;
    this.em.dob = dob.value;
    this.em.address = address.value;
    this.em.role = role.value;
    this.em.salary = salary.value;
    this.em.experience = experience.value;
    this.ser.updateemployee(this.em).subscribe((data) => {
      alert("Updated successfully")
    });
  }
  ngOnInit() {
  }

}
