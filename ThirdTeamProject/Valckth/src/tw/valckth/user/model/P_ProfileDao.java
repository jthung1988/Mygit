package tw.valckth.user.model;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;

@Repository
public class P_ProfileDao {

	private SessionFactory sessionFactory;

	public P_ProfileDao(){}
	
	@Autowired
	public P_ProfileDao(@Qualifier(value = "sessionFactory") SessionFactory sessionFactory) {
		System.out.println("SessionFactory: " + sessionFactory);
       this.sessionFactory = sessionFactory;
	}
	
	public P_Profile createProfile(P_Profile profile, PD_ProfileDetail profileDetail) {
		Session session = sessionFactory.getCurrentSession();
		P_Profile qProfile = session.get(P_Profile.class, profile.getUserId());
		
		try {
			if(qProfile==null) {
				profileDetail.setProfile(profile);
				profile.setProfileDetail(profileDetail);
				System.out.println("is nll?:\n" + profile.getUserId() + "\n" + profileDetail);
				session.save(profile);
			}
		}catch(Exception e) {
			System.out.println("Error:ProfileDao");
			e.printStackTrace();
		}
		return profile;
	}
	
	public P_Profile queryProfile(String userId) {
		Session session = sessionFactory.getCurrentSession();
		try {
			P_Profile qProfile = session.get(P_Profile.class, userId);
			if(qProfile!=null) {
				return qProfile;
			}
		}catch(Exception e) {
			System.out.println("Error:ProfileDao");
			e.printStackTrace();
		}
		return null;
	}
	
	public boolean updateProfile(P_Profile profile) {
		Session session = sessionFactory.getCurrentSession();
		try {
			P_Profile qProfile = session.get(P_Profile.class, profile.getUserId());
			if(qProfile!=null) {
				qProfile.setUserName(profile.getUserName());
				qProfile.setUserPwd(profile.getUserPwd());
				qProfile.setGender(profile.getGender());
				qProfile.setUserImg(profile.getUserImg());
				return true;
			}
		}catch(Exception e) {
			System.out.println("Error:ProfileDao");
			e.printStackTrace();
		}
		return false;
	}
	
	public boolean updateProfile(P_Profile profile, PD_ProfileDetail profileDetail) {
		Session session = sessionFactory.getCurrentSession();
		try {
			P_Profile qProfile = session.get(P_Profile.class, profile.getUserId());
			if(qProfile!=null) {
				qProfile.setUserName(profile.getUserName());
				qProfile.setUserPwd(profile.getUserPwd());
				qProfile.setGender(profile.getGender());
				qProfile.setUserImg(profile.getUserImg());
				qProfile.setProfileDetail(profileDetail);
				return true;
			}
		}catch(Exception e) {
			System.out.println("Error:ProfileDao");
			e.printStackTrace();
		}
		return false;
	}
}
