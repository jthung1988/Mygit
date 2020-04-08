package tw.gameshop.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import tw.gameshop.user.model.PD_ProfileDetail;
import tw.gameshop.user.model.P_Profile;
import tw.gameshop.user.model.P_ProfileService;

@Controller
public class TestController {
	
	private P_ProfileService pservice;

	public TestController() {}
	
	@Autowired
	public TestController(P_ProfileService pservice) {
		this.pservice = pservice;
	}
	
	@RequestMapping(path = "/processProfile" , method = RequestMethod.GET)
	public String processAction() {
		System.out.println("Controller start");
		P_Profile p = new P_Profile("uid4","unm4","upd4","nn4","abc@");
		PD_ProfileDetail pd = new PD_ProfileDetail("add4", "2020-03-03", "0900123456");
		try {
			pservice.createProfile(p,pd);
//			P_Profile qp = pservice.queryProfile("uid1");
//			System.out.println(qp.getUserName());
			System.out.println("process end");
			return "Success";
		}catch(Exception e){
			System.out.println("Error!!");
			e.printStackTrace();
			return "";
		}
		
	}
}
