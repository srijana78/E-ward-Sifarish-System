import { useState } from "react";

function Notifications() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "application",
      title: "New Application Received",
      message:
        "A new Residence Recommendation application has been submitted.",
      applicationId: "EW-2026-00124",
      time: "10 minutes ago",
      unread: true,
      icon: "📋",
    },
    {
      id: 2,
      type: "application",
      title: "New Application Received",
      message:
        "Ram Sharma submitted a Relationship Certificate application.",
      applicationId: "EW-2026-00123",
      time: "45 minutes ago",
      unread: true,
      icon: "📋",
    },
    {
      id: 3,
      type: "system",
      title: "Application Verification Pending",
      message:
        "There are 18 applications waiting for verification.",
      time: "1 hour ago",
      unread: true,
      icon: "⏳",
    },
    {
      id: 4,
      type: "success",
      title: "Application Verified",
      message:
        "Application EW-2026-00121 has been successfully verified.",
      applicationId: "EW-2026-00121",
      time: "Yesterday",
      unread: false,
      icon: "✓",
    },
    {
      id: 5,
      type: "warning",
      title: "Application Rejected",
      message:
        "Application EW-2026-00119 was rejected after review.",
      applicationId: "EW-2026-00119",
      time: "Yesterday",
      unread: false,
      icon: "!",
    },
  ]);

  const markAsRead = (id) => {
    setNotifications((current) =>
      current.map((notification) =>
        notification.id === id
          ? { ...notification, unread: false }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((current) =>
      current.map((notification) => ({
        ...notification,
        unread: false,
      }))
    );
  };

  const unreadCount = notifications.filter(
    (notification) => notification.unread
  ).length;

  return (
    <div className="max-w-5xl mx-auto">

      {/* Page Header */}
      <div className="mb-7">
        <p className="text-sm font-medium text-blue-700">
          Ward Administration
        </p>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
              Notifications
            </h1>

            <p className="text-sm text-slate-500 mt-1">
              प्रणालीका सूचना तथा आवेदन सम्बन्धी जानकारी
            </p>
          </div>

          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="
                text-sm
                font-semibold
                text-blue-700
                hover:text-blue-800
                transition
              "
            >
              Mark all as read
            </button>
          )}
        </div>
      </div>

      {/* Notification Summary */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 mb-5">
        <div className="flex items-center gap-4">

          <div className="
            w-12
            h-12
            rounded-xl
            bg-blue-50
            text-blue-700
            flex
            items-center
            justify-center
            text-xl
          ">
            🔔
          </div>

          <div>
            <p className="font-bold text-slate-800">
              {unreadCount} Unread Notifications
            </p>

            <p className="text-sm text-slate-400 mt-1">
              तपाईंका नयाँ सूचनाहरू
            </p>
          </div>

        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">

        {notifications.map((notification) => (

          <div
            key={notification.id}
            onClick={() => markAsRead(notification.id)}
            className={`
              p-5
              sm:p-6
              border-b
              border-slate-100
              last:border-b-0
              cursor-pointer
              transition
              ${
                notification.unread
                  ? "bg-blue-50/40 hover:bg-blue-50"
                  : "hover:bg-slate-50"
              }
            `}
          >

            <div className="flex gap-4">

              {/* Icon */}
              <div className={`
                w-11
                h-11
                rounded-xl
                flex
                items-center
                justify-center
                shrink-0
                text-base
                ${
                  notification.type === "success"
                    ? "bg-green-50 text-green-700"
                    : notification.type === "warning"
                    ? "bg-red-50 text-red-700"
                    : notification.type === "system"
                    ? "bg-amber-50 text-amber-700"
                    : "bg-blue-50 text-blue-700"
                }
              `}>
                {notification.icon}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">

                  <div className="flex items-center gap-2">

                    <h3 className="text-sm font-semibold text-slate-800">
                      {notification.title}
                    </h3>

                    {notification.unread && (
                      <span className="
                        w-2
                        h-2
                        rounded-full
                        bg-blue-600
                        shrink-0
                      " />
                    )}

                  </div>

                  <span className="text-xs text-slate-400">
                    {notification.time}
                  </span>

                </div>

                <p className="text-sm text-slate-500 mt-1 leading-relaxed">
                  {notification.message}
                </p>

                {notification.applicationId && (
                  <span className="
                    inline-block
                    mt-2
                    text-xs
                    font-semibold
                    text-blue-700
                    bg-blue-50
                    px-2.5
                    py-1
                    rounded-lg
                  ">
                    {notification.applicationId}
                  </span>
                )}

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Notifications;