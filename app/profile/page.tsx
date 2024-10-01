'use client'

import React, { useState } from 'react';
import AppLayout from '@/layouts/AppLayout';
import Quicklinks from '@/components/Quicklinks';
import styled from "styled-components";
import AccountInfo from "@/components/pages/profile/AccountInfo";
import ProductUpload from "@/components/pages/profile/ProductUpload";
import { BlueTab, BlueTabs } from "@/utils/CustomStyles";
import { useAppSelector, useAppDispatch } from '@/redux/hooks'

const Profile: React.FC = () => {
    const { user, status } = useAppSelector((state) => state.userReducer);
    const [value, setValue] = useState<number>(1);
    const [htabs, setHtabs] = useState({
        accInfo: false,
        changePass: false,
        address: false,
        stats: false,
        upload: false,
    });

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    return (
        <AppLayout>
            <QuickLinkCon>
                <Quicklinks next="My Account" />
            </QuickLinkCon>
            <Con>
                <div className="inner">
                    <BlueTabs
                        value={value}
                        onChange={handleChange}
                        aria-label="Post Type"
                        variant="scrollable"
                        allowScrollButtonsMobile
                    >
                        <BlueTab value={1} label="Account Information" />
                        {user?.role === 'admin' && <BlueTab value={2} label="Product upload" />}
                    </BlueTabs>
                    <div className="tab-items mt-10">
                        {value === 1 && <AccountInfo user={user} />}
                        {value === 2 && <ProductUpload />}
                    </div>
                </div>
                <div className="inner-mob">
                    <AgreeDrop>
                        <div
                            className={`cover`}
                            onClick={() => setHtabs(prev => ({ ...prev, accInfo: !prev.accInfo }))}
                        >
                            <h2>Account Information</h2>
                            <div>
                                {htabs.accInfo ? (
                                    <img src="/images/pages/profile/up.svg" alt="img" />
                                ) : (
                                    <img src="/images/pages/profile/down.svg" alt="img" />
                                )}
                            </div>
                        </div>
                        {htabs.accInfo && <AccountInfo user={user} />}
                    </AgreeDrop>
                    {user?.role === 'admin' && (
                        <>
                            <AgreeDrop>
                                <div
                                    className={`cover`}
                                    onClick={() => setHtabs(prev => ({ ...prev, upload: !prev.upload }))}
                                >
                                    <h2>Products upload</h2>
                                    <div>
                                        {htabs.upload ? (
                                            <img src="/images/pages/profile/up.svg" alt="img" />
                                        ) : (
                                            <img src="/images/pages/profile/down.svg" alt="img" />
                                        )}
                                    </div>
                                </div>
                                {htabs.upload && <ProductUpload />}
                            </AgreeDrop>
                        </>
                    )}
                </div>
            </Con>
        </AppLayout>
    );
};

const Con = styled.div`
  width: 100%;
  padding: 24px 120px 40px 120px;
  display: flex;
  justify-content: center;
  @media (max-width: 1200px) {
    padding: 24px;
  }
  .inner {
    width: 77%;
    display: flex;
    flex-direction: column;
    align-items: center;
    @media (max-width: 1200px) {
      width: 100%;
    }
    @media (max-width: 500px) {
      display: none;
    }
    .tab-items {
      width: 100%;
    }
  }
  .inner-mob {
    width: 100%;
    display: none;
    @media (max-width: 500px) {
      display: block;
    }
  }
`;

const QuickLinkCon = styled.div`
  width: 100%;
  height: 56px;
  padding: 16px 120px;
  margin-top: 98px;
  background: var(--off-white, #fcfcfc);
  margin-bottom: 30px;
  @media (max-width: 1200px) {
    padding: 24px;
  }
`;

const AgreeDrop = styled.div`
  width: 100%;
  padding: 12px 8px;
  border-radius: 8px;
  background: var(--grey-grey-50, #f5f5f6);
  margin-bottom: 30px;
  .cover {
    width: 100%;
    height: 52px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    h2 {
      color: var(--grey-700, #101113);
      font-family: Poppins;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 150%;
    }
  }
  .cover-disabled {
    background: #e0e2e7;
  }
  .space {
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .sub-text {
    font-family: 'Euclid Circular A';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    color: #667085;
    margin-top: 20px;
    margin-bottom: 20px;
  }
`;

export default Profile;
