package tw.gameshop.controller;

import java.util.regex.Pattern;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.context.annotation.SessionScope;
import org.springframework.web.multipart.MultipartFile;

import tw.gameshop.user.model.PD_ProfileDetail;
import tw.gameshop.user.model.P_Profile;
import tw.gameshop.user.model.P_ProfileService;

@Controller
public class TestController {
	
	private P_ProfileService pservice;
	Pattern regUserAccount = Pattern.compile("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).*{6,18}$");
	Pattern regUserPwd = Pattern.compile("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).*{6,12}$");
//	Pattern regUserName = Pattern.compile("^[\u4E00-\u9FFF]{2,}$");

	public TestController() {}
	 
	@Autowired
	public TestController(P_ProfileService pservice) {
		this.pservice = pservice;
	}
	
	@RequestMapping("/index.html")
	public String toHome() {
		return "home";
	}
	
	@RequestMapping(path = "/processImg" , method = RequestMethod.POST)
	public String processImageAction(@RequestParam("userImg") MultipartFile userImg) {
		try {
			
			byte[] img = userImg.getBytes();
			System.out.println(img);
			return "Success";
		}catch(Exception e){
			System.out.println("Error!!");
			e.printStackTrace();
			return "";
		}
	}
	@RequestMapping(path = "/processProfile" , method = RequestMethod.POST)
	public String processAction(
			@RequestParam("userAccount") String userAccount,
			@RequestParam("userName") String userName,
			@RequestParam("userPwd") String userPwd,
			@RequestParam("nickName") String nickname,
			@RequestParam("mail") String mail) {
		
		System.out.println("Controller start");
		try {
			if(pservice.queryProfile(userAccount) == null) {
				P_Profile p = new P_Profile(userAccount, userName, userPwd, nickname, mail);
//				p.setUserImg(userImg.getBytes());
				PD_ProfileDetail pd = new PD_ProfileDetail("add4", "2020-03-03", "0900123456");
				pservice.createProfile(p,pd);
				System.out.println("process end");
				return "Success";
			}	
		}catch(Exception e){
			System.out.println("Error!!");
			e.printStackTrace();
		}
		return "home";
	}
	
	@RequestMapping(value = "/processLogin", method = RequestMethod.POST)
	@SessionScope
	public String processLogin(
			@RequestParam(name = "userAccount")String userAccount,
			@RequestParam(name = "userPwd")String userPwd,
			Model model) {
		System.out.println("processLogin");
		P_Profile profile = null;
//		if(regUserAccount.matcher(userAccount).matches() && regUserPwd.matcher(userPwd).matches()) {
			profile = pservice.processLogin(userAccount,userPwd);
//		}
		if(profile != null) {
			model.addAttribute("userAccount", profile.getUserAccount());
			model.addAttribute("userName", profile.getUserName());
			model.addAttribute("nickname", profile.getNickname());
			
			System.out.println("Login Successfully");
		}
		return "home";
	}
	
	@RequestMapping(value = "/logout", method = RequestMethod.GET)
	public String processLogout(HttpServletRequest request) {
		System.out.println("logout");
		request.getSession().invalidate();
		return "home";
	}
}
