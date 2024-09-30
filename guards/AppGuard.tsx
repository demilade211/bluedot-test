import React, { useCallback, useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '@/redux/hooks'
import { SetUser, SetExpired } from "../redux/slices/userSlice";
import { ShowLoader, HideLoader } from "../redux/slices/loaderSlice";
import { getLoggedInUser } from "../services/auth"
import cookie from "js-cookie"
import AppLoader from '../components/loaders/AppLoader';
import { useRouter, usePathname } from 'next/navigation'

const AppGuard: React.FC<any> = ({ children }) => {

  const Router = useRouter();
  const pathname = usePathname()

  const { loader } = useAppSelector(state => state.loaderReducer)
  const { user } = useAppSelector((state) => state.userReducer);
  let token = cookie.get("token");

  const protectedRoutes =  pathname === "/profile" 

  const dispatch = useAppDispatch();

  const doFetchUserDetails = useCallback(async () => {


    try {
      dispatch(ShowLoader())
      const response = await getLoggedInUser()
      dispatch(HideLoader())
      if (response.success) {
        dispatch(SetUser({
          ...response.user,
          productsCount: response.productsCount,
          userCount: response.userCount,
          quotationCount: response.quotationCount
        }))
      } else {
        if (response.message === "JSON Web Token is expired. Try Again!!!") {
          dispatch(SetExpired("expired"))
          cookie.remove("token");
          Router.push("/auth/login");
        }
      }
    } catch (error) {
      dispatch(HideLoader())
      // dispatch(SetExpired("Unauthenticated"))
      // cookie.remove("token");
      // Router.push("/auth/login");
    }
  }, [dispatch])

  useEffect(() => {
    if (token) {
      doFetchUserDetails()
    } else {
      dispatch(HideLoader())
    }
  }, [doFetchUserDetails])

  return (
    <>
      {loader ? <AppLoader /> : children}
    </>
  )
}

export default AppGuard